const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace 'your-resume-page-url' with the URL of your HTML page containing the resume
  await page.goto('resume.html');

  // Evaluate a function within the page to get the inner HTML of the resume div
  const resumeHTML = await page.evaluate(() => {
    const resumeDiv = document.getElementById('emily_holcomb_resume');
    return resumeDiv ? resumeDiv.innerHTML : null;
  });

  if (resumeHTML) {
    const pdfContent = `
      <html>
        <head>
          <style>
            
            .resume {
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                /*align-items: center;*/
                padding: 1.5rem;
            }
            
            .resume-group {
                margin: 1.25rem 0;
            }
            
            .resume-detail {
                margin: 1rem 0;
            }
            
            .resume-detail ul {
                list-style-type: disc;
                list-style-position: outside;
                margin-left: 0;
                padding-left: .5em; /* Adjust this value based on your design */
            }
            
            .resume-detail li {
                text-align: left;
                margin: 0.5rem;
            }

          </style>
        </head>
        <body>
          ${resumeHTML}
        </body>
      </html>
    `;

    await page.setContent(pdfContent);
    await page.pdf({ path: 'emily_holcomb_resume.pdf', format: 'A4' });
  } else {
    console.error('Resume content not found');
  }

  await browser.close();
})();
