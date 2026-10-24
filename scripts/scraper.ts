import * as cheerio from 'cheerio';

const url = 'https://pc.liquid.by/';
const className = '.node.widget-element.widget.css47';

export async function scrape() {
    const response = await fetch(url);
    const html = await response.text();


    const $ = cheerio.load(html);

    const divs = $(`div${className}`);

    console.log(`Найдено элементов: ${divs.length}`);

    divs.each((index, element) => {
        const text = $(element).text().trim();
        console.log(`--- Элемент ${index + 1} ---`);
        console.log(text);
    })
}

scrape();