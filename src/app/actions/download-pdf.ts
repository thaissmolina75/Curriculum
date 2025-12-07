'use server';

import fs from 'fs';
import path from 'path';
import chromium from '@sparticuz/chromium';
import { cvData } from '@/lib/cvData';
import { PDFDocument } from 'pdf-lib';

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

        const imageBuffer = fs.readFileSync(path.join(process.cwd(), "public", "CV-pic.jpeg"));
        const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Inter', Arial, sans-serif;
                    font-size: 10.5pt;
                    line-height: 1.4;
                    color: #000;
                    background: #fff;
                    margin: 40px;
                    max-width: 900px;
                }
                h1 {
                    font-size: 24pt;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin: 0;
                    letter-spacing: 1px;
                    text-align: center;
                    margin-bottom: 5px;
                }
                .contact-info {
                    font-size: 10pt;
                    color: #333;
                    text-align: left;
                    max-width: 300px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 25px;
                }
                h2 {
                    font-size: 12pt;
                    text-transform: uppercase;
                    border-bottom: 2px solid #000;
                    margin-top: 20px;
                    margin-bottom: 12px;
                    padding-bottom: 2px;
                    font-weight: 700;
                }
                h3 {
                    font-size: 11pt;
                    font-weight: 600;
                    margin: 0;
                }
                .job-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-bottom: 2px;
                }
                .job-company {
                    font-weight: 600;
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
                    font-weight: 600;
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
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; width:100%;">
                
                <!-- LEFT: CONTACT INFO -->
                <div style="flex:1; font-size:8pt; color:#333; text-align:left; line-height:1.3; display:flex; flex-direction:column; gap:6px; padding-right:10px;">

                    <!-- CONTACT ITEMS (RESTORED EXACTLY AS BEFORE) -->
                    <div style="display:flex; align-items:center; gap:5px;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#333">
                            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.25 1.01l-2.2 2.2z"/>
                        </svg>
                        <span>${cvData.contact.phone}</span>
                    </div>

                    <div style="display:flex; align-items:center; gap:5px;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#333">
                            <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1l-10 6L2 5V4zm0 4l10 6 10-6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8z"/>
                        </svg>
                        <span>${cvData.contact.email}</span>
                    </div>

                    <div style="display:flex; align-items:center; gap:5px;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#0077b5">
                            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 23.5h4V7h-4v16.5zM8.5 7h3.8v2.2h.06c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.77 2.65 4.77 6.1v7.4h-4V14c0-1.6-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.48v9.62h-4V7z"/>
                        </svg>
                        <a href="https://${cvData.contact.linkedin}" style="color:#333; text-decoration:none;">
                            ${cvData.contact.linkedin}
                        </a>
                    </div>

                    <div style="display:flex; align-items:center; gap:5px;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#000">
                            <path d="M12 .5C5.66.5.5 5.66.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.57-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.65.23 2.87.11 3.17.75.8 1.2 1.82 1.2 3.08 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.1.8 2.22 0 1.6-.02 2.88-.02 3.27 0 .31.2.68.8.56A10.52 10.52 0 0023.5 12c0-6.34-5.16-11.5-11.5-11.5z"/>
                        </svg>
                        <a href="https://${cvData.contact.github}" style="color:#333; text-decoration:none;">
                            ${cvData.contact.github}
                        </a>
                    </div>

                    <!-- RELOCATION (ONLY CHANGE, MOVED UNDER EVERYTHING) -->
                    <div style="text-align:center; margin-top:10px; font-size:7pt; color:#555; width:100%;">
                        📍 ${cvData.contact.location}
                    </div>

                </div>

                <!-- CENTER: NAME (UNCHANGED, CENTERED) -->
                <div style="flex:1; text-align:center;">
                    <h1 style="margin-top:0;">${cvData.name}</h1>
                    <div style="font-size:11pt; font-weight:600; color:#444;">${cvData.title}</div>
                </div>

                <!-- RIGHT: PHOTO -->
                <div style="flex:1; text-align:right;">
                    <img src="${base64Image}" alt="Profile photo"
                        style="width:120px; height:120px; object-fit:cover; border-radius:8px;"/>
                </div>
            </div>

            <div style="margin-top:20px;"></div>
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

        const firstPdfBuffer = await page.pdf({
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

        const recommendationPath = path.join(process.cwd(), "public", "recommendation_letter-1.pdf");
        const recommendationBuffer = fs.readFileSync(recommendationPath);

        const finalPdf = await PDFDocument.create();
        const firstPdf = await PDFDocument.load(firstPdfBuffer);
        const recPdf = await PDFDocument.load(recommendationBuffer);

        const firstPages = await finalPdf.copyPages(firstPdf, firstPdf.getPageIndices());
        firstPages.forEach(p => finalPdf.addPage(p));

        const recPages = await finalPdf.copyPages(recPdf, recPdf.getPageIndices());
        recPages.forEach(p => finalPdf.addPage(p));

        const mergedPdf = await finalPdf.save();
        return mergedPdf;

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Failed to generate PDF. ' + (error as Error).message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}