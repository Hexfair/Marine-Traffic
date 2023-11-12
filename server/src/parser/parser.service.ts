import { Injectable } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';
import * as cheerio from 'cheerio';
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';
import { PositionService } from 'src/position/position.service';
import { ShipService } from 'src/ship/ship.service';
//===========================================================================================================
dayjs.extend(utc);
dayjs.extend(customParseFormat);
//const basicUrl = 'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=shipname,mmsi,time_of_latest_position,lat_of_latest_position,lon_of_latest_position,course';
const basicUrl = 'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=shipname%2Cmmsi%2Ctime_of_latest_position%2Clat_of_latest_position%2Clon_of_latest_position%2Ccourse&quicksearch_shipid=';
//===========================================================================================================

//https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=shipname%2Cmmsi%2Ctime_of_latest_position%2Clat_of_latest_position%2Clon_of_latest_position%2Ccourse&quicksearch_shipid=6101903,455238,6715978



@Injectable()
export class ParserService {
	constructor(
		private readonly positionService: PositionService,
		private readonly shipService: ShipService,
	) { }

	//@Cron('0 0 */4 * * *')
	//@Timeout(2000)
	async handleCron() {
		console.log('Время запуска парсера: ', dayjs().format('YYYY-MM-DD HH:mm'));

		const allShipsData = await this.shipService.findAll();
		const allShipsQueryMMSI = allShipsData.map((obj) => obj.shipId);

		const queryItems: string[] = [];
		for (let i = 0; i < allShipsQueryMMSI.length; i += 10) {
			const chunk = allShipsQueryMMSI.slice(i, i + 10).join(',');
			queryItems.push(chunk);
		}

		const browser = await puppeteer.launch({
			headless: 'new',
			'ignoreHTTPSErrors': true,
			channel: 'chrome',
		});
		const page = await browser.newPage();
		page.setDefaultNavigationTimeout(50000);

		let itemsIndex = 0;
		const timerId = setInterval(() => {
			console.log(`ЗАГРУЗКА ${itemsIndex + 1} из ${queryItems.length}`);
			fetch(queryItems[itemsIndex]);
			itemsIndex = itemsIndex + 1;
			if (itemsIndex === queryItems.length) {
				setTimeout(async function () {
					console.log('Время окончания работы парсера: ', dayjs().format('YYYY-MM-DD HH:mm'));
					clearInterval(timerId);
					await browser.close();
				}, 40000);
			}
		}, 30000);

		const fetch = async (params: string) => {
			try {
				await page.goto(basicUrl + params, { waitUntil: 'networkidle0' });
				await page.setViewport({ width: 1680, height: 1220 });

				const acceptBtn = await page.$("button[mode='primary']");

				if (acceptBtn) {
					await acceptBtn.click();
				}

				const html = await page.content();
				const $ = cheerio.load(html);

				const elements = $('div.MuiDataGrid-virtualScrollerRenderZone div.MuiDataGrid-row');

				for (let item of elements) {
					let mmsi = $(item).find('div[data-field="mmsi"] div').text().trim();
					let latestTime = $(item).find('div[data-field="time_of_latest_position"] div').text().trim().slice(0, 16);
					let latitude = $(item).find('div[data-field="lat_of_latest_position"] div').text().trim();
					let longitude = $(item).find('div[data-field="lon_of_latest_position"] div').text().trim();
					let course = $(item).find('div[data-field="course"] div').text().trim().split(' ')[0];
					let latestTimeDays = dayjs(`${latestTime} UTC`);

					const positionData = {
						mmsi: Number(mmsi),
						latestTime: new Date(latestTimeDays.toISOString()),
						course: Number.isNaN(Number(course)) ? 0 : Number(course),
						latitude,
						longitude,
					}

					const checkShip = await this.positionService.findLastPosition(Number(mmsi));

					if (!checkShip || dayjs(positionData.latestTime).isAfter(dayjs(checkShip.latestTime))) {
						await this.positionService.create(positionData)
					}
				}
			} catch (e) {
				console.log(e)
			}
		};
	}
}
