# PASSWORD STRENGTH CHECKER

A small, beginner-friendly password strength checker built with Python, Flask, HTML, CSS, and JavaScript. The password is analyzed locally in your browser; the application does not store, log, or transmit it.

## Requirements

- Python 3.9 or newer
- pip

## Installation

Clone the project and move into its directory:

```bash
git clone https://github.com/sonu5204397-bot/PASSWORD-STRENGTH-CHECKER.git
cd PASSWORD-STRENGTH-CHECKER
```

Create and activate a virtual environment:

```bash
python3 -m venv .venv
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the required package:

```bash
python -m pip install -r requirements.txt
```

## Run

Start the local development server:

```bash
python app.py
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

## Usage

Enter a password in the password field. Its strength updates as you type. Use the show/hide control to reveal or conceal the password. The checker considers length, uppercase and lowercase letters, numbers, and special characters, then displays a strength rating and relevant improvement suggestions.

Password analysis runs entirely in the browser. The Python application only serves the checker page and does not receive the password.

## Project files

```text
.
├── app.py
├── requirements.txt
├── README.md
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── index.html
└── tests/
    └── test_app.py
```

## Test

Run the application tests with Python's built-in test runner:

```bash
python -m unittest discover -s tests
```
