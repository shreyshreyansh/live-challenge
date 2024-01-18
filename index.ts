init();

async function init() {
  console.log(await getUniqueSentences(10, 3));
}

function getUniqueSentences(n: number, c: number) {
  return new Promise(async (resolve, reject) => {
    // your implementation
    let promises: Promise<string>[] = [];
    const results: string[] = [];
    let iterator = 1;
    while (true) {
      if (promises.length % c == 0) {
        let result = await Promise.all(promises).catch((err) => '');
        let filteredRes: string[] = [];
        if (result && result.length > 0) {
          filteredRes = (result as string[]).filter((r) => r !== '');
        }
        results.push(...filteredRes);
        promises = [];
        console.log(`Fetched ${results.length} sentences, fetching more...`);
      }

      if (results.length >= n) {
        console.log(`Fetching complete, found ${results.length} sentences`);
        break;
      }

      if (results.length < n) {
        promises.push(getMockSentences());
      }
      iterator++;
    }

    const sentences = results.slice(0, n);
    console.log(`Resolving ${sentences.length} sentences`);
    resolve(sentences);
  });
}

// to generate a random number

function getRandomNumberBetween(x: number, y: number) {
  if (x >= y) throw new Error('x must be less than y');

  return Math.floor(x + Math.random() * (y - x));
}

// to add a delay in the response

function randomSleep() {
  const ms = getRandomNumberBetween(100, 1000);

  return new Promise((resolve) => setTimeout(resolve, ms));
}

// to throw the error from the API

function canThrowError(errorRate: 'high' | 'med' | 'low') {
  const num = getRandomNumberBetween(1, 100);

  if (errorRate == 'high') return num % 2 == 0;

  if (errorRate == 'med') return num % 5 == 0;

  return num % 10 == 0;
}

// this function is a mock of an API call and it will always return a random sentence

async function getMockSentences() {
  const data = [
    'The sun is shining brightly in the clear blue sky.',

    'I enjoy taking long walks in the peaceful park.',

    "She couldn't believe her eyes when she saw the surprise.",

    'Pizza is my all-time favorite comfort food.',

    'The curious cat explored every corner of the room.',

    'He played the guitar with passion and skill.',

    'The adventure begins with a single step into the unknown.',

    'Reading a good book is like traveling to different worlds.',

    'The laughter of children echoed through the playground.',

    'After a long day at work, I like to relax in a warm bath.',

    'The old oak tree provided shade on hot summer days.',

    'They celebrated their anniversary with a romantic dinner.',

    'The wise owl offered valuable advice to the young owlets.',

    'A rainbow appeared after the rain, bringing hope.',

    'The chef prepared a delicious meal with fresh ingredients.',

    'Lost in thought, she gazed out the window at the stars.',

    "The river flowed gently, reflecting the moon's glow.",

    'The athletes trained tirelessly for the upcoming competition.',

    'With a map in hand, they embarked on a journey of discovery.',

    'Music has the power to touch the soul and evoke emotions.',
  ];

  await randomSleep();

  if (canThrowError('high')) throw new Error('Error while fetching data');

  return data[Math.floor(getRandomNumberBetween(0, data.length))];
}
