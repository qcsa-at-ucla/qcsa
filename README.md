# Welcome to the official documentation repository for the Quantum Computing Student Association (QCSA).

## Overview

## Features

## Environment Setup

To connect the registration form to your Google Form, you need to set up environment variables:

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Create a Google Form with the following fields:
   - First Name
   - Last Name
   - Email
   - Educational Background
   - Experience Rating
   - Institution Name

3. Get your Google Form URL and entry IDs:
   - Open your Google Form
   - Copy the pre-fill link
   - However, you use the https://docs.google.com/forms/d/e/[YOUR_ACTUAL_FORM_ID]/formResponse
   - Right-click on the form and "Inspect Element" (or press F12)
   - Press Ctrl+F to search in the HTML
   - Search for "entry." to find all entry IDs
   - Look for input elements with names like `entry.123456789`
      - This is straightforward for name + description fields
      - Slightly complicated for drop-downs/multiple choices
   
   **How to find all entry IDs systematically:**
   1. In the developer tools, press Ctrl+F to open search
   2. Search for entry 
   3. This will highlight all entry fields

  

4. Update `.env.local` with your actual values:

   ```env
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse
   NEXT_PUBLIC_GOOGLE_FORM_FIRST_NAME=entry.123456789
   # ... etc
   ```

5. Restart your development server after updating environment variables.

## Link

## Project Structure

## Recent Updates

## Contributors
