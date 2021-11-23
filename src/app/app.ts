import * as GL from './gl';
import * as UI from './ui';
import * as Sim from './sim';

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

  /** The simulation stage. */
  private _stage: Sim.Stage|null;

  // Default constructor.
  public constructor() {
    this._stage = null;

    // Initialize the loading screen.
    this.loadingScreen = UI.LoadingScreen.fromSelector('div#loading');

    // Initialize the renderer.
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this._renderer = GL.createRenderer(canvas);

    // Initialize the resize callback
    window.addEventListener('resize', () => {
      this.loadingScreen.loading = true;
      window.clearTimeout(this._resizeTimer);
      this._resizeTimer = window.setTimeout(() => {
        this._renderer.onResize();
        this.loadingScreen.loading = false;
      }, 250);
    });

    // Create introduction form.
    const intro = UI.FormChain.fromSelector('#introduction')!;
    intro.visible = true;
    intro.setOnSubmit(() => {
      // Get parameters from the form.
      const params: Sim.StageSettings = {
        population: intro.get<number>('population')!.value,
        mutationRate: intro.get<number>('mutationRate')!.value,
        eyeCount: intro.get<number>('eyeCount')!.value,
        hiddenLayerSize: intro.get<number>('hiddenLayerSize')!.value,
        initialFoodCount: intro.get<number>('initialFoodCount')!.value,
        newFoodRate: intro.get<number>('newFoodRate')!.value,
        roundDuration: intro.get<number>('roundDuration')!.value,
      };

      // Create the stage.
      this._stage = new Sim.Stage(params);
    });
  }

  /**
   * Starts the application.
   */
  public start(): void {
    // Initialize the time step timer.
    this._lastTime = 0.0;
    this.loadingScreen.loading = false;
    requestAnimationFrame(this.onAnimationFrame.bind(this));
  }

  /**
   * Animates the application.
   * @param dt Delta time in seconds.
   */
  private animate(dt: number): void {
    // Update and draw the stage.
    if (this._stage !== null) {
      this._stage.update(dt);
      this._stage.draw(this._renderer);
    } 

    // Flush the renderer.
    this._renderer.flush();
  }

  /**
   * Called when the round ends.
   * @param time Time in milliseconds since the beginning of the application.
   */
  private onAnimationFrame(time: number): void {
    // Calculate the delta time in seconds.
    const dt = (time - this._lastTime) * 0.001;
    this._lastTime = time;

    // Animate the application.
    if (!this.loadingScreen.loading) this.animate(dt);
    requestAnimationFrame(this.onAnimationFrame.bind(this));
  }
}