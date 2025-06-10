# Deltio Bot

This project was developed to automate bots that follow a target player in the delt.io game. Each bot is manually launched through different browser sessions and VPN connections. This system generates a customized JavaScript file for each bot with the help of a Python script.

## Purpose

Through this system, each bot:
* Follows a designated target player in the game area (canvas)
* Simulates mouse movements like a real player
* Automatically presses the "Q" key and clicks the "Play" button (optionally)

## File Structure

```
.
├── core.js            # Template JavaScript file for bot behaviors
├── generate_bots.py   # Python script that generates bot-specific .js files
├── bot1.js            # Generated bot scripts (example)
├── bot2.js
├── ...
```

## Usage

### 1. Define Bot List and Target Player
Edit the following fields by opening the `generate_bots.py` file:

```python
target = "target_player_name"
bots = ["bot1", "bot2", "bot3", ...]
```

### 2. Generate Bot Scripts
Run the Python script:

```bash
python generate_bots.py
```

This process takes the content from `core.js` and creates a separate `.js` file for each bot name (example: `bot1.js`, `bot2.js`, ...).

### 3. Inject Scripts in Browser
Follow these steps to run each bot:
1. Launch browser through a different IP address using VPN
2. Open the delt.io game page
3. Open developer tools with `F12` key
4. Switch to the `Console` tab
5. Paste and run the content from the relevant `botX.js` file in the console

## Details

* Bots read both their own and the target player's position through `app.clients.player[0].ghostCells`
* Direction vector is calculated based on the target's position and the mouse is simulated in that direction using `MouseEvent`
* If the `qPlayEnabled` option is active, the bot presses the `Q` key at specific intervals and clicks the "Play" button
* Navigation is performed through mouse movement on the game screen (canvas)

## Notes

* Each bot must be launched from a different IP address (VPN)
* If the DOM structure changes in the game interface, the CSS selector for the "Play" button must be updated
* The script should only be used for experimental and educational purposes. It may violate game rules.
