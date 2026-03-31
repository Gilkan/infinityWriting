# infinityWriting

A lightweight JavaScript function that simulates an infinite terminal typing effect.  
Designed for visual experimentation, humor, and mild existential discomfort.

---

## Features

- Infinite typing loop using efficient circular indexing
- Self-replicating mode (prints its own source code forever)
- Optional "Matrix-style" random character mode
- Glitch effects (fake system errors, chaotic output)
- Random backspace behavior for realism
- Smooth rendering via `requestAnimationFrame`
- Ctrl+C support to terminate execution
- Optional fullscreen terminal mode

---

## Usage

    <div id="terminal"></div>

    <script>
        infinityWriting("terminal", {
            fullscreen: true,
            speed: 16,
            charsPerFrame: 2,
            backgroundColor: "black",
            fontColor: "green",
            mode: "self" // or "matrix"
        });
    </script>

---

## Options

| Option          | Type    | Default | Description                  |
| --------------- | ------- | ------- | ---------------------------- |
| fullscreen      | boolean | false   | Expands to full screen       |
| speed           | number  | 16      | Frame throttle (ms-like)     |
| charsPerFrame   | number  | 2       | Characters written per frame |
| backgroundColor | string  | black   | Background color             |
| fontColor       | string  | green   | Text color                   |
| mode            | string  | self    | "self" or "matrix"           |

---

## Modes

### self

Prints the function's own source code in an infinite loop.

### matrix

Outputs a continuous stream of pseudo-random characters.

---

## Controls

- Ctrl + C → Stops execution (simulates terminal interrupt)

---

## Notes

- Uses `textContent` instead of `innerHTML` for performance and safety
- Avoids memory growth by not duplicating strings
- Rendering is synchronized with the browser for smoother output
- Glitch behavior is intentionally random and non-deterministic

---

## Disclaimer

This project is intentionally pointless.

It does not hack anything, compile anything, or improve productivity.

It only looks like it does.
