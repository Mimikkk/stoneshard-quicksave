# Stoneshard Quicksave

A web-based quicksave mechanism for the game Stoneshard. This application provides a simple interface to save and load your game state by managing the game's save files.

## How It Works

The application works by copying save files between two directories in your Stoneshard character folder:

- **Exitsave** (`exitsave_1`): The save created when you exit to the main menu
- **Quicksave** (`Quicksave`): A backup copy that you can restore from

### Save Process

1. Copies the current `exitsave_1` folder to `Quicksave` folder
2. Allows you to restore this state later

### Load Process

1. Copies the `Quicksave` folder back to `exitsave_1` folder
2. Replaces your current exitsave with the saved state

## Prerequisites

- [Deno](https://deno.land/) runtime
- Stoneshard game installed
- Access to your Stoneshard character save directory

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd stoneshard-quicksave
   ```

2. Create a `.env` file in the root directory and specify your character path:
   ```env
   CHARACTER_LOCATION_PATH=C:\Users\[username]\AppData\Local\StoneShard\characters_v1\character_1
   ```

   **Note**: Replace `[username]` with your actual Windows username and adjust the path to match your character folder.

3. Install dependencies:
   ```bash
   deno install
   ```

## Usage

1. **Start the development server**:
   ```bash
   deno task dev
   ```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Use the interface**:
   - Click "Save" to create a quicksave from your current exitsave
   - Click "Load" to restore your game from the quicksave
   - The buttons will be disabled when operations aren't available

## Important Notes

- **Save Availability**: You can only save when you have an exitsave (i.e., when you've exited to the main menu)
- **Load Availability**: You can only load when you have a previously created quicksave
- **Game State**: Always exit to the main menu before using the save/load functionality
- **Backup**: The application creates backups by copying folders, so your original saves remain intact

## API Endpoints

The application provides the following REST API endpoints:

- `GET /api/can-save` - Check if save operation is available
- `GET /api/can-load` - Check if load operation is available
- `POST /api/save` - Create a quicksave from exitsave
- `POST /api/load` - Restore game from quicksave

## Development

### Available Scripts

- `deno task dev` - Start development server with Turbopack
- `deno task build` - Build for production
- `deno task start` - Start production server

## Troubleshooting

- **"You cannot save"**: Make sure you've exited to the main menu in Stoneshard
- **"You cannot load"**: Create a quicksave first before trying to load
- **Path errors**: Verify your `CHARACTER_LOCATION_PATH` in the `.env` file is correct
- **Permission errors**: Ensure the application has read/write access to your Stoneshard save directory

## License

This project is for personal use with the Stoneshard game. Please respect the game's terms of service and use responsibly.
