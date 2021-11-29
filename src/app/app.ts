import * as GL from './gl';
import {Vec2} from './math';
import * as Sim from './sim';
import {Statistics} from './sim/statistics';
import * as UI from './ui';

/** The movement speed of the camera. */
const CAMERA_MOVEMENT_SPEED = 0.002;

/** The zoom speed of the camera. */
const CAMERA_ZOOM_SPEED = 0.1;

/** Maximum number of skipped frames. */
const MAX_SKIP = 5;

/**
 * Manages all the application state.
 */
export class App {
  /** Renderer used to draw. */
  private _renderer: GL.Renderer;

  /** Loading screen. */
  private loadingScreen: UI.LoadingScreen;

  /** Resize timer. */
  private _resizeTimer: number;

  /** Last update time. */
  private _lastTime: number;

  /** The simulation time. */
  private _simulationTime: number;

  /** Update time accumulator. */
  private _updateTimeAccumulator: number;

  /** Last mouse position. */
  private _lastMouse: Vec2|null;

  /** The currently selected creature. */
  private _selectedCreature: Sim.Creature|null;

  /** The simulation stage. */
  private _stage: Sim.Stage|null;

  /** The simulation speed. */
  private _simulationSpeed: UI.Slider;

  /** The statistics button. */
  private _statisticsButton: UI.Button;

  /** The statistics. */
  private _statistics: Statistics;

  /** The best creature button. */
  private _bestButton: UI.Button;

  /** The fast forward button. */
  private _fastForwardButton: UI.Button;

  /** The current generation display. */
  private _currentGeneration: UI.Display;

  /** The fitness display. */
  private _fitness: UI.Display;

  /** The fast forward icon. */
  private _fastForwardIcon: HTMLElement;

  /** The pause icon. */
  private _pauseIcon: HTMLElement;

  /** Is fast forward enabled? */
  private _fastForward: boolean;

  // Default constructor.
  public constructor() {
    this._stage = null;

    // Initialize the loading screen.
    this.loadingScreen = UI.LoadingScreen.fromSelector('div#loading');

    // Initialize the renderer.
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this._renderer = GL.createRenderer(canvas);

    // Initialize the resize callback.
    window.addEventListener('resize', () => {
      this.loadingScreen.loading = true;
      window.clearTimeout(this._resizeTimer);
      this._resizeTimer = window.setTimeout(() => {
        this._renderer.resize();
        this.loadingScreen.loading = false;
      }, 250);
    });

    // Initialize the mouse input callbacks.
    this._lastMouse = null;
    this._selectedCreature = null;
    canvas.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      this._lastMouse = Vec2.new(e.offsetX, e.offsetY);
      this._selectedCreature = this._stage?.pickCreature(this._renderer.camera.canvasToWorld(this._lastMouse)) ?? null;
      if (this._selectedCreature !== null) this._lastMouse = null;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (this._lastMouse !== null) {
        const mouse = Vec2.new(e.offsetX, e.offsetY);
        const delta = mouse.sub(this._lastMouse);
        this._lastMouse = mouse;

        // Update the camera.
        const movement = Vec2.new(-delta.x, delta.y).mul(CAMERA_MOVEMENT_SPEED / this._renderer.camera.zoom);
        this._renderer.camera.position = this._renderer.camera.position.add(movement);
      }
    });
    canvas.addEventListener('mouseup', e => {
      if (e.button !== 0) return;
      this._lastMouse = null;
    });
    canvas.addEventListener('wheel', (e) => {
      const delta = e.deltaY;
      const zoom = delta < 0 ? CAMERA_ZOOM_SPEED : -CAMERA_ZOOM_SPEED;
      this._renderer.camera.zoom *= 1 + zoom;
    });

    // Initialize overlay.
    this._bestButton = UI.Button.fromSelector(document.body, 'button#bestButton')!;
    this._bestButton.addOnClickCallback(() => {
      if (this._stage !== null) this._selectedCreature = this._stage.getBestCreature();
    });
    this._currentGeneration = UI.Display.fromSelector(document.body, 'div#currentGeneration')!;
    this._currentGeneration.value = 1;
    this._fitness = UI.Display.fromSelector(document.body, 'div#fitness')!;
    this._fitness.visible = false;
    this._fitness.value = 0;
    this._simulationSpeed = UI.Slider.fromSelector(document.body, 'div#simulationSpeed')!;
    this._fastForwardButton = UI.Button.fromSelector(document.body, 'button#fastForwardButton')!;
    this._fastForwardButton.addOnClickCallback(() => {
      if (this._stage !== null) {
        window.setTimeout(() => {
          while (this._fastForward)
            ;
          this._fastForward = true;
          while (!this._stage!.update())
            ;
          this._currentGeneration.value += 1;
          this._stage!.startRound();
          this._selectedCreature = null;
          this._fastForward = false;
        }, 50);
      }
    });
    this._fastForward = false;
    this._fastForwardIcon = document.body.querySelector('i#fastForward')!;
    this._fastForwardIcon.classList.toggle('hidden', true);
    this._pauseIcon = document.body.querySelector('i#pause')!;
    this._pauseIcon.classList.toggle('hidden', true);

    // Create introduction form.
    const intro = UI.FormChain.fromSelector('#introduction')!;
    intro.visible = true;
    intro.setOnSubmit(() => {
      // Get parameters from the form.
      const params: Sim.StageSettings = {
        population: intro.get<number>('population')!.value,
        mutationRate: intro.get<number>('mutationRate')!.value,
        eyeCount: intro.get<number>('eyeCount')!.value,
        minExtraNeuronCount: intro.get<[number, number]>('extraNeuronCount')!.value[0],
        maxExtraNeuronCount: intro.get<[number, number]>('extraNeuronCount')!.value[1],
        minConnectionCount: intro.get<[number, number]>('connectionCount')!.value[0],
        maxConnectionCount: intro.get<[number, number]>('connectionCount')!.value[1],
        initialFoodCount: intro.get<number>('initialFoodCount')!.value,
        newFoodRate: intro.get<number>('newFoodRate')!.value,
        roundDuration: intro.get<number>('roundDuration')!.value,
      };

      // Create the stage.
      this._stage = new Sim.Stage(params);

      // Reset the view.
      this._renderer.camera.position = Vec2.ZERO;
      this._renderer.camera.zoom = 0.25;
    });
  }

  /**
   * Starts the application.
   */
  public start(): void {
    // Initialize the time step timer.
    this._lastTime = 0.0;
    this._updateTimeAccumulator = 0.0;
    this._simulationTime = 0.0;
    this.loadingScreen.loading = false;
    this._renderer.submit(new GL.CommandQueue(0.0));
    requestAnimationFrame(this.onAnimationFrame.bind(this));
  }

  /**
   * Animates the application.
   * @param dt Delta time in seconds.
   */
  private animate(dt: number): void {
    this._fastForwardIcon.classList.toggle('hidden', !this._fastForward);

    // Update and draw the stage.
    if (this._stage !== null && !this._fastForward) {
      this._updateTimeAccumulator += dt * this._simulationSpeed.value;
      this._simulationTime += dt * this._simulationSpeed.value;
      if (this._updateTimeAccumulator >= Sim.TIME_STEP) {
        // Generate the draw command queue.
        let queue = new GL.CommandQueue(this._simulationTime);
        this._stage.draw(queue);
        if (this._selectedCreature) {
          this._renderer.camera.position = this._selectedCreature.position;
          this._renderer.camera.velocity = this._selectedCreature.velocity;
          this._selectedCreature.nn.draw(
              queue, this._selectedCreature.position.add(Vec2.new(0, -0.5)), this._selectedCreature.velocity, 0.5);
        } else
          this._renderer.camera.velocity = Vec2.ZERO;
        this._renderer.submit(queue);

        // Update the stage.
        for (let i = 0; i < MAX_SKIP && this._updateTimeAccumulator >= Sim.TIME_STEP; i++) {
          if (this._stage.update()) {
            this._currentGeneration.value += 1;
            this._stage.startRound();
          }
          this._updateTimeAccumulator -= Sim.TIME_STEP;
        }
        this._updateTimeAccumulator = 0.0;

        // Update the UI.
        this._fitness.visible = this._selectedCreature !== null;
        if (this._selectedCreature) this._fitness.value = this._selectedCreature.fitness;
      } else {
        this._renderer.camera.position =
            this._renderer.camera.position.add(this._renderer.camera.velocity.mul(dt * this._simulationSpeed.value));
      }
    }

    // Flush the renderer.
    this._renderer.flush(this._simulationTime);
  }

  /**
   * Called when the round ends.
   * @param time Time in milliseconds since the beginning of the application.
   */
  private onAnimationFrame(time: number): void {
    // Calculate the delta time in seconds.
    const dt = (time - this._lastTime);
    this._lastTime = time;

    // Animate the application.
    if (!this.loadingScreen.loading) this.animate(dt * 0.001);
    requestAnimationFrame(this.onAnimationFrame.bind(this));
  }
}