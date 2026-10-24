import * as cheerio from 'cheerio';
import type { Product } from '../src/types.ts'

const url = 'https://pc.liquid.by/'; 
const className = '.node.widget-element.widget.css47';
const title = '.textable.css49'
const price = ".textable.css44:contains('BYN')"
let id = 0;

//^ placeholder, will create a database later

export async function scrape() {
    const response = await fetch(url);
    const html = await response.text();


    const $ = cheerio.load(html);

    const divs = $(`div${className}`);

    const products: Product[] = [];

    console.log(`Найдено элементов: ${divs.length}`);

    $(divs).each((i, el) => {
        id++;
        const t = $(el).find(title).text().trim();
        const p = $(el).find(price).text().trim();
        products.push({id, name: t, shopUrl: url, className: className, price: p})
    })

    console.log(products)
}

scrape();