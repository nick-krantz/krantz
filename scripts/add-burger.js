import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BURGERS_FILE = join(__dirname, '../src/data/burgers.json');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function getBurgerDetails() {
  console.log('\n=== Add New Burger ===\n');

  const name = await question('Burger name: ');
  const restaurant = await question('Restaurant name: ');
  const description = await question('Description: ');
  const rankInput = await question('Rank (number): ');
  const rank = parseInt(rankInput, 10);

  if (isNaN(rank)) {
    console.error('Error: Rank must be a number');
    process.exit(1);
  }

  const url = await question('Restaurant URL: ');
  const location = await question('Location (e.g., "Minneapolis, MN"): ');
  const latitudeInput = await question('Latitude: ');
  const latitude = parseFloat(latitudeInput);

  if (isNaN(latitude)) {
    console.error('Error: Latitude must be a number');
    process.exit(1);
  }

  const longitudeInput = await question('Longitude: ');
  const longitude = parseFloat(longitudeInput);

  if (isNaN(longitude)) {
    console.error('Error: Longitude must be a number');
    process.exit(1);
  }

  const minnesotaInput = await question('Is in Minnesota? (y/n): ');
  const minnesota = minnesotaInput.toLowerCase() === 'y';

  const kitchenFloorInput = await question('Kitchen floor? (y/n): ');
  const kitchen_floor = kitchenFloorInput.toLowerCase() === 'y';

  return {
    name,
    restaurant,
    description,
    rank,
    url,
    location,
    latitude,
    longitude,
    minnesota,
    kitchen_floor
  };
}

function updateRanks(burgers, newRank, isKitchenFloor) {
  // If the new burger has kitchen_floor: true, don't update other ranks
  if (isKitchenFloor) {
    return burgers;
  }

  // Increment ranks for all burgers that:
  // 1. Have kitchen_floor: false
  // 2. Have rank >= newRank
  return burgers.map(burger => {
    if (!burger.kitchen_floor && burger.rank >= newRank) {
      return { ...burger, rank: burger.rank + 1 };
    }
    return burger;
  });
}

async function main() {
  try {
    // Read existing burgers
    const burgersData = readFileSync(BURGERS_FILE, 'utf-8');
    let burgers = JSON.parse(burgersData);

    // Get new burger details
    const newBurger = await getBurgerDetails();

    // Generate ID (find max ID and add 1)
    const maxId = Math.max(...burgers.map(b => b.id), 0);
    newBurger.id = maxId + 1;

    // Generate created_at timestamp
    newBurger.created_at = new Date().toISOString();

    // Update ranks of existing burgers if necessary
    burgers = updateRanks(burgers, newBurger.rank, newBurger.kitchen_floor);

    // Add new burger
    burgers.push(newBurger);

    // Write back to file
    writeFileSync(BURGERS_FILE, JSON.stringify(burgers, null, 2) + '\n');

    console.log('\n✓ Burger added successfully!');
    console.log(`ID: ${newBurger.id}`);
    console.log(`Name: ${newBurger.name}`);
    console.log(`Restaurant: ${newBurger.restaurant}`);
    console.log(`Rank: ${newBurger.rank}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
