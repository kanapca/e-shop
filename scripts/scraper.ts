import * as cheerio from 'cheerio';
import type { Product } from '../src/types'
import { writeFile, mkdir } from 'node:fs/promises'

const BASE_URL = 'https://books.toscrape.com/catalogue/category/books_1/index.html';

const SELECTORS = {
    item: 'article.product_pod',
    title: 'h3 a',
    price: '.price_color',
};
let id = 0;

export async function scrape() {
    const response = await fetch(BASE_URL);
    const html = await response.text();


    const $ = cheerio.load(html);
    const lis = $(SELECTORS.item);

    const products: Product[] = [];

    console.log(`Найдено элементов: ${lis.length}`);

    $(lis).each((i, el) => {
        id++;
        const t = $(el).find(SELECTORS.title).text().trim();
        const p = $(el).find(SELECTORS.price).text().trim();
        products.push({id, name: t, shopUrl: BASE_URL, className: SELECTORS.item, price: p})
    })


    const json = JSON.stringify(products, null, 2);

    await mkdir('data', { recursive: true });
    await writeFile('data/products.json', json, 'utf-8');
}

scrape();