import { Injectable } from '@nestjs/common';
import { CreateParserDto } from './dto/create-parser.dto';
import { UpdateParserDto } from './dto/update-parser.dto';
import { Interval, Timeout } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';
import * as cheerio from 'cheerio';
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from 'src/ship/entities/ship.entity';
import { Repository } from 'typeorm';
import { PositionService } from 'src/position/position.service';
import { ShipService } from 'src/ship/ship.service';
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.utc().format()

const basicUrl = 'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=shipname,mmsi,time_of_latest_position,lat_of_latest_position,lon_of_latest_position,course';


@Injectable()
export class ParserService {
	constructor(
		@InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
		private readonly positionService: PositionService,
		private readonly shipService: ShipService,

	) { }

	//@Timeout(5000)
	// async handleTimeout() {

	// 	const allShipsData = await this.shipRepository.find();
	// 	const allShipsQueryMMSI = allShipsData.map((obj) => '&mmsi|eq|mmsi=' + obj.mmsi);

	// 	const queryItems: string[] = [];
	// 	for (let i = 0; i < allShipsQueryMMSI.length; i += 10) {
	// 		const chunk = allShipsQueryMMSI.slice(i, i + 10).join('');
	// 		queryItems.push(chunk);
	// 	}

	// 	const browser = await puppeteer.launch({
	// 		headless: 'new',
	// 		'ignoreHTTPSErrors': true,
	// 		channel: 'chrome',
	// 	});
	// 	const page = await browser.newPage();
	// 	page.setDefaultNavigationTimeout(0);

	// 	let itemsIndex = 0;
	// 	const timerId = setInterval(() => {
	// 		console.log(`ЗАГРУЗКА ${itemsIndex + 1}`);
	// 		fetch(queryItems[itemsIndex]);
	// 		itemsIndex = itemsIndex + 1;
	// 		// if (itemsIndex === queryItems.length) {
	// 		// 	clearInterval(timerId);
	// 		// }
	// 		if (itemsIndex === 1) {
	// 			clearInterval(timerId);
	// 		}
	// 	}, 10000);

	// 	// &mmsi|eq|mmsi=369970203&mmsi|eq|mmsi=369970159


	// 	const fetch = async (params: string) => {
	// 		try {
	// 			await page.goto(basicUrl + params, { waitUntil: 'networkidle0' });
	// 			await page.setViewport({ width: 1680, height: 1224 });

	// 			const html = await page.content();
	// 			const $ = cheerio.load(html);

	// 			const elements = $('div.ag-center-cols-container div[role="row"]');
	// 			console.log(elements.length);
	// 			for (let item of elements) {
	// 				let mmsi = $(item).find('div[col-id="mmsi"] div div').text();
	// 				let latestTime = $(item).find('div[col-id="time_of_latest_position"] div').text().slice(0, -4);
	// 				let latitude = $(item).find('div[col-id="lat_of_latest_position"] div div').text();
	// 				let longitude = $(item).find('div[col-id="lon_of_latest_position"] div div').text();
	// 				let course = $(item).find('div[col-id="course"] div div').text().split(' ')[0];
	// 				let latestTimeNumber = dayjs(latestTime, "YYYY-MM-DD HH:mm", true).valueOf();

	// 				const positionData = {
	// 					mmsi: Number(mmsi),
	// 					latestTime: Number(latestTimeNumber) / 1000,
	// 					course: Number(course),
	// 					latitude,
	// 					longitude,
	// 				}

	// 				const checkShip = await this.positionService.findLastPosition(Number(mmsi));
	// 				//console.log(checkShip);
	// 				if (Number(latestTimeNumber) > Number(checkShip.latestTime)) {
	// 					await this.positionService.create(positionData)
	// 				}
	// 				//2022-02-19 17:56 UTC
	// 				// console.log(mmsi)
	// 				// console.log(latestTime)
	// 				// console.log(latestTimeNumber)
	// 				// console.log(latitude)
	// 				// console.log(longitude)
	// 				//console.log(course)
	// 				// console.log('-----------------------')

	// 			}
	// 		} catch (e) {
	// 			console.log(e)
	// 		}
	// 	};
	// }

	create(createParserDto: CreateParserDto) {
		return 'This action adds a new parser';
	}

	findAll() {
		return `This action returns all parser`;
	}

	findOne(id: number) {
		return `This action returns a #${id} parser`;
	}

	update(id: number, updateParserDto: UpdateParserDto) {
		return `This action updates a #${id} parser`;
	}

	remove(id: number) {
		return `This action removes a #${id} parser`;
	}
}
