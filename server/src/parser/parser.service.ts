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
dayjs.extend(utc)
dayjs.extend(customParseFormat)
const basicUrl = 'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=shipname,mmsi,time_of_latest_position,lat_of_latest_position,lon_of_latest_position,course';
//===========================================================================================================

@Injectable()
export class ParserService {
	constructor(
		private readonly positionService: PositionService,
		private readonly shipService: ShipService,
	) { }

	@Cron('0 0 */4 * * *')
	async handleCron() {
		console.log('Время запуска парсера: ', dayjs().format('YYYY-MM-DD HH:mm'));

		const allShipsData = await this.shipService.findAll();
		const allShipsQueryMMSI = allShipsData.map((obj) => '&mmsi|eq|mmsi=' + obj.mmsi);

		const queryItems: string[] = [];
		for (let i = 0; i < allShipsQueryMMSI.length; i += 10) {
			const chunk = allShipsQueryMMSI.slice(i, i + 10).join('');
			queryItems.push(chunk);
		}

		const browser = await puppeteer.launch({
			headless: 'new',
			'ignoreHTTPSErrors': true,
			channel: 'chrome',
		});
		const page = await browser.newPage();
		page.setDefaultNavigationTimeout(0);

		let itemsIndex = 0;
		const timerId = setInterval(() => {
			console.log(`ЗАГРУЗКА ${itemsIndex + 1}`);
			fetch(queryItems[itemsIndex]);
			itemsIndex = itemsIndex + 1;
			if (itemsIndex === queryItems.length) {
				setTimeout(async function () {
					console.log('Время окончания работы парсера: ', dayjs().format('YYYY-MM-DD HH:mm'));
					clearInterval(timerId);
					await browser.close();
				}, 40000);
			}
		}, 60000);

		const fetch = async (params: string) => {
			try {
				await page.goto(basicUrl + params, { waitUntil: 'networkidle0' });
				await page.setViewport({ width: 1680, height: 1220 });

				const html = await page.content();
				const $ = cheerio.load(html);

				const elements = $('div.ag-center-cols-container div[role="row"]');

				for (let item of elements) {
					let mmsi = $(item).find('div[col-id="mmsi"] div div').text();
					let latestTime = $(item).find('div[col-id="time_of_latest_position"] div').text().slice(0, 16);
					let latitude = $(item).find('div[col-id="lat_of_latest_position"] div div').text();
					let longitude = $(item).find('div[col-id="lon_of_latest_position"] div div').text();
					let course = $(item).find('div[col-id="course"] div div').text().split(' ')[0];
					let latestTimeDays = dayjs(`${latestTime} UTC`);

					const positionData = {
						mmsi: Number(mmsi),
						latestTime: new Date(latestTimeDays.toISOString()),
						course: Number(course),
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
