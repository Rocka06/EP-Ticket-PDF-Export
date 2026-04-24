# EP-Ticket-PDF-Export

Automated tool to download EasyProject tickets/issues as PDF files in batch. This script uses browser automation to log in to your EasyProject instance and export individual tickets as printable PDFs.

## Features

- **Batch Download**: Process multiple tickets at once from a CSV file
- **Opens Comments Autmatically**: Before exporting, it presses the "Show All" button on the bottom, so every comment is exported

## Prerequisites

- **Node.js**: v14 or higher (required)
- **EasyProject Account**: Valid login credentials with access to tickets
- **CSV File**: List of ticket IDs to download (one per line or custom delimiter)

## Installation

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/Rocka06/EP-Ticket-PDF-Export
   cd EP-Ticket-PDF-Export
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Configuration

1. Create the environment file:
```bash
cp template.env .env
```

2. Edit `.env` with your configuration:

```env
EASYPROJECT_BASE_URL=https://your-easyproject-url.com
ISSUE_ID_CSV_PATH=tickets.csv
PDF_SAVE_PATH=./Tickets
```

### Configuration Details

| Variable | Description | Example |
|----------|-------------|---------|
| `EASYPROJECT_BASE_URL` | Base URL of your EasyProject instance | `https://projects.company.com` |
| `ISSUE_ID_CSV_PATH` | Relative path to file with ticket IDs | `./tickets.csv` |
| `PDF_SAVE_PATH` | Relative path to the directory to save downloaded PDFs | `./pdfs` |

## Preparing Your Ticket List

Create a Text file (e.g., `tickets.txt`) with the ticket IDs to download:

```
1234
1235
1236
```

## Usage

Run the script using npm:

```bash
npm run tickets
```

The script will:
1. Open a browser window
2. Navigate to the EasyProject login page
3. **Pause and wait for you to log in manually** (for security)
4. Once logged in and redirected to your dashboard, automatically proceed
5. Download each ticket as a PDF
6. Display progress in the console
7. Close the browser and exit

### Example Console Output

```
Please log in manually
Downloading ticket 1234
Saved Ticket-1234.pdf
Downloading ticket 1235
Saved Ticket-1235.pdf
```