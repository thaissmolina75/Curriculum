'use server';

import chromium from '@sparticuz/chromium';
import { cvData } from '@/lib/cvData';

export async function downloadCvAsPdf() {
    let browser = null;
    try {
        const isProduction = process.env.NODE_ENV === 'production';

        let puppeteerModule: typeof import('puppeteer') | typeof import('puppeteer-core');

        if (isProduction) {
            puppeteerModule = await import('puppeteer-core');
        } else {
            puppeteerModule = await import('puppeteer');
        }

        const launchOptions = {
            args: isProduction ? [...chromium.args, '--hide-scrollbars', '--disable-web-security', '--font-render-hinting=none'] : [],
            headless: isProduction ? chromium.headless : true,
            ignoreHTTPSErrors: true,
            executablePath: isProduction
                ? await chromium.executablePath()
                : puppeteerModule.executablePath(),
        };

        browser = await puppeteerModule.launch(launchOptions);
        const page = await browser.newPage();

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 10.5pt;
                    line-height: 1.4;
                    color: #000;
                    background: #fff;
                    margin: 40px;
                    max-width: 900px;
                }
                h1 {
                    font-size: 24pt;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                    text-align: center;
                    letter-spacing: 1px;
                }
                .contact-info {
                    text-align: center;
                    font-size: 10pt;
                    margin-bottom: 25px;
                    color: #333;
                }
                h2 {
                    font-size: 12pt;
                    text-transform: uppercase;
                    border-bottom: 2px solid #000;
                    margin-top: 20px;
                    margin-bottom: 12px;
                    padding-bottom: 2px;
                    font-weight: bold;
                }
                h3 {
                    font-size: 11pt;
                    font-weight: bold;
                    margin: 0;
                }
                .job-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-bottom: 2px;
                }
                .job-company {
                    font-weight: bold;
                    color: #444;
                    margin-bottom: 4px;
                }
                ul {
                    margin-top: 4px;
                    margin-bottom: 12px;
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 3px;
                }
                .skills-grid {
                    display: table;
                    width: 100%;
                    border-spacing: 0 6px;
                }
                .skill-row {
                    display: table-row;
                }
                .skill-category {
                    display: table-cell;
                    font-weight: bold;
                    width: 160px;
                    vertical-align: top;
                }
                .skill-list {
                    display: table-cell;
                }
                .education-item, .language-item {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <h1>${cvData.name}</h1>
            <div class="contact-info">
                ${cvData.title}<br>
                ${cvData.contact.email} • ${cvData.contact.phone} • ${cvData.contact.location}<br>
                LinkedIn: ${cvData.contact.linkedin} • GitHub: ${cvData.contact.github}
            </div>

            <h2>Research Interests</h2>
            <p>${cvData.summary}</p>

            <h2>Education</h2>
            ${cvData.education.map(edu => `
                <div class="education-item">
                    <div class="job-header">
                        <h3>${edu.degree}</h3>
                        <span>${edu.dates}</span>
                    </div>
                    <div>${edu.university}</div>
                </div>
            `).join('')}

            <h2>Technical Skills</h2>
            <div class="skills-grid">
            ${Object.entries(cvData.skills).map(([category, skills]) => `
                <div class="skill-row">
                    <div class="skill-category">${category}</div>
                    <div class="skill-list">${skills.map(s => s.name).join(', ')}</div>
                </div>
            `).join('')}
            </div>

            <h2>Experience</h2>
            ${cvData.experience.map(exp => `
                <div class="job">
                    <div class="job-header">
                        <h3>${exp.title}</h3>
                        <span>${exp.dates}</span>
                    </div>
                    <div class="job-company">${exp.company}</div>
                    <ul>
                        ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}

            <h2>Selected Projects</h2>
            ${cvData.projects.map(proj => `
                <div class="job">
                    <div class="job-header">
                        <h3>${proj.title}</h3>
                        <span>${proj.dates}</span>
                    </div>
                    <div class="job-company">${proj.company}</div>
                    <ul>${proj.description.map(desc => `<li>${desc}</li>`).join('')}</ul>
                </div>
            `).join('')}

            <h2>Languages</h2>
            ${cvData.languages.map(lang => `
                <div class="language-item">
                    <strong>${lang.name}:</strong> ${lang.proficiency}
                </div>
            `).join('')}
        </body>
        </html>
        `;

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // @ts-ignore
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
        const pageHeight = bodyHeight + 80;

        return await page.pdf({
            printBackground: true,
            width: '210mm',
            height: `${pageHeight}px`,
            margin: {
                top: '0mm',
                right: '0mm',
                bottom: '0mm',
                left: '0mm',
            },
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Failed to generate PDF. ' + (error as Error).message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}