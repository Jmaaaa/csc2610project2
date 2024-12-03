const fs = require('fs');
const https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

var allLots = {};

// var options = {
//     host: 'www.lsu.edu',
//     port: 80,
//     path: '/parking/availability.php'
//   };

function parseLot(sectionName, dayName, data) {
    const td = data.querySelectorAll('td');

    const lotName = td[0].textContent.trim();
    const lotNumber = td[1].textContent.trim();
    const totalSpaces = parseInt(td[2].textContent);
    const percentFull = Array.from(td).slice(3).map(x => parseInt(x.textContent));

    // console.log(`${lotName}: #${lotNumber}, ${totalSpaces} (${percentFull}%)`);
    // return {
    //     lotName: lotName,
    //     lotNumber: lotNumber,
    //     totalSpaces: totalSpaces,
    //     percentFull: percentFull
    // };

    if (!(lotName in allLots)) {
        allLots[lotName] = {
            lotType: sectionName,
            lotName: lotName,
            lotNumber: lotNumber,
            totalSpaces: totalSpaces,
            days: []
        };
    }

    allLots[lotName].days.push({
        day: dayName,
        percentFull: percentFull
    });
}

function parseDay(sectionName, data) {
    const dayName = data.querySelector('button').textContent.trim();
    const rows = data.querySelectorAll('tr');
    // console.log(`${rows.length} rows`);

    // return {
    //     day: dayName,
    //     availability: Array.from(rows).slice(1).map(x => parseLot(x))
    // };
    for (const row of Array.from(rows).slice(1))
        parseLot(sectionName, dayName, row);
}

function parseParking(sectionName, data) {
    const days = data.querySelectorAll('.card');
    // console.log(`${days.length} days`);

    // return Array.from(days).map(x => parseDay(x));
    for (const day of days)
        parseDay(sectionName, day);
}

https.get('https://www.lsu.edu/parking/availability.php', function(res) {
    let html = '';

    res.on('data', (chunk) => {
        html += chunk;
    });

    res.on('end', () => {
        console.log('end');
        const dom = new JSDOM(html);

        const sections = dom.window.document.querySelectorAll('.accordion-section-2');
        console.log(`${sections.length} sections`);
        
        parseParking("Commuter Permit Parking", sections[0]);
        parseParking("Residential Permit Parking", sections[1]);
        parseParking("Greek Permit Parking", sections[2]);
        parseParking("B Permit Parking", sections[3]);

        /*
        const output = {
            "types": [
                {
                    name: "Commuter Permit Parking",
                    days: parseParking(sections[0])
                },
                {
                    name: "Residential Permit Parking",
                    days: parseParking(sections[1])
                },
                {
                    name: "Greek Permit Parking",
                    days: parseParking(sections[2])
                },
                {
                    name: "B Permit Parking",
                    days: parseParking(sections[3])
                }
            ]
        };
        */

        let output = Object.values(allLots);
        
        fs.writeFile('scraper/data.json', JSON.stringify(output), 'utf8', () => {
            process.exit();
        });
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
    process.exit();
});