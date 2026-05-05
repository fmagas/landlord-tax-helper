# Landlord Tax Helper

A simple SaaS MVP demo for landlords to upload a CSV and get a rental income and expense summary.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js settings.
4. Deploy.

The app uses a small API route and in-memory CSV processing only, so it does not need a database, background jobs, or environment variables.

## Example CSV Format

The CSV can include headers:

```csv
date,description,amount,type
2024-01-01,Rent January,1200,income
2024-01-05,Plumber,200,expense
2024-02-01,Rent February,1200,income
```

Headerless CSV files also work if the columns are in this order:

```csv
2024-01-01,Rent January,1200,income
2024-01-05,Plumber,200,expense
```

## Limitations

- CSV only.
- Maximum upload size is 1MB.
- No authentication.
- No database or saved history.
- No PDF parsing.
- No multi-user accounts.
- Not a full accounting or tax filing system.

## Next Steps

- PDF parsing.
- Email ingestion.
- HMRC-ready output.
- Multi-property support.
