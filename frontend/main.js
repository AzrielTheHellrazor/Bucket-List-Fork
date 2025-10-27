import { CONTRACT_ADDRESS } from './config.js';

const ABI = [
  { "inputs": [], "name": "MAX_ITEMS_PER_USER", "outputs": [{"internalType":"uint8","name":"","type":"uint8"}], "stateMutability":"view","type":"function" },
  { "inputs": [], "name": "FEE_PER_ITEM", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}], "stateMutability":"view","type":"function" },
  { "inputs": [{"internalType":"string","name":"item","type":"string"}], "name": "addItem", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [{"internalType":"address","name":"user","type":"address"}], "name":"getItems","outputs": [{"internalType":"string[]","name":"","type":"string[]"}], "stateMutability":"view","type":"function" },
  { "inputs": [], "name":"clearMyItems","outputs": [], "stateMutability":"nonpayable","type":"function" }
];

// Fee amount as hex (0.0001 ETH = 100000000000000 wei)
const FEE_AMOUNT = "0x5af3107a4000"; // 0.0001 ETH in hex

const provider = window.ethereum;
let signer;
let contract;

const connectBtn = document.getElementById('connectBtn');
const addBtn = document.getElementById('addBtn');
const viewBtn = document.getElementById('viewBtn');
const refreshMineBtn = document.getElementById('refreshMine');
const clearMineBtn = document.getElementById('clearMine');
const browseExamplesBtn = document.getElementById('browseExamplesBtn');

const itemInput = document.getElementById('itemInput');
const addressInput = document.getElementById('addressInput');
const myList = document.getElementById('myList');
const otherList = document.getElementById('otherList');
const contractAddr = document.getElementById('contractAddr');

contractAddr.textContent = CONTRACT_ADDRESS;

// Example bucket lists to showcase the community feature
const exampleBucketLists = [
  {
    address: '0x1234...abcd',
    items: [
      'Visit the Northern Lights in Iceland',
      'Skydiving from 15,000 feet',
      'Learn to play the guitar',
      'Road trip across America',
      'Start my own business',
      'Climb Mount Everest',
      'Swim with dolphins',
      'Learn Spanish fluently',
      'Write a bestselling book',
      'Own a supercar'
    ]
  },
  {
    address: '0x5678...efgh',
    items: [
      'See the Egyptian Pyramids',
      'Scuba dive in the Great Barrier Reef',
      'Go to a Metallica concert',
      'Learn a new language',
      'Write a book',
      'Run the New York Marathon',
      'Visit Machu Picchu',
      'See the Taj Mahal',
      'Hot air balloon ride',
      'Master the art of cooking'
    ]
  },
  {
    address: '0x90ab...cdef',
    items: [
      'Visit all 7 continents',
      'Run a marathon',
      'Swim with dolphins',
      'See the Northern Lights',
      'Go on a safari',
      'Learn to fly a plane',
      'Go to space camp',
      'Skydive in Dubai',
      'Taste authentic Italian pizza in Naples',
      'Build my dream house'
    ]
  }
];

// Cache for real community addresses (loaded from localStorage)
let realCommunityAddresses = JSON.parse(localStorage.getItem('bucketListCommunity') || '[]');

// Display user list helper
function displayUserList(addr, items, idx) {
  const li = document.createElement('li');
  li.style.marginTop = '16px';
  li.style.padding = '12px';
  li.style.background = 'rgba(15, 23, 42, 0.6)';
  li.style.borderRadius = '8px';
  
  const shortAddr = `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  li.innerHTML = `<strong style="color: #3b82f6; display: block; margin-bottom: 8px;">${shortAddr}</strong><ul style="list-style: none; padding: 0; margin: 0;">${items.map((item, i) => `<li style="padding: 2px 0; list-style: none;">${getEmojiForItem(item)} ${item}</li>`).join('')}</ul>`;
  
  otherList.appendChild(li);
}

// Show community lists (real + examples)
async function showExampleLists() {
  otherList.innerHTML = '<li style="padding: 8px; color: #94a3b8; font-style: italic; list-style: none;">Browse community bucket lists:</li>';
  
  // Try to show real community lists if contract connected
  if (contract && realCommunityAddresses.length > 0) {
    for (let i = 0; i < Math.min(3, realCommunityAddresses.length); i++) {
      try {
        const addr = realCommunityAddresses[i];
        const items = await contract.getItems(addr);
        if (items.length > 0) {
          displayUserList(addr, items, i);
        }
      } catch (err) {
        console.log('Error loading community list:', err);
      }
    }
    return;
  }
  
  // Fallback to examples
  const randomExamples = exampleBucketLists.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  randomExamples.forEach((example, idx) => {
    const li = document.createElement('li');
    li.style.marginTop = '16px';
    li.style.padding = '12px';
    li.style.background = 'rgba(15, 23, 42, 0.6)';
    li.style.borderRadius = '8px';
    li.style.listStyle = 'none';
    li.innerHTML = `
      <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${example.address}</div>
      <div style="max-height: 300px; overflow-y: auto; padding-right: 8px;">
        ${example.items.map((item, i) => {
          const emoji = getEmojiForItem(item);
          return `<div style="padding: 2px 0;"><span style="font-size: 1.5em; margin-right: 8px; min-width: 28px; text-align: center; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));">${emoji}</span> ${i + 1}. ${item}</div>`;
        }).join('')}
      </div>
    `;
    otherList.appendChild(li);
  });
  
  otherList.innerHTML += '<li style="padding: 8px; color: #94a3b8; font-size: 12px; text-align: center; margin-top: 12px; list-style: none;">Enter any address above to view their bucket list!</li>';
}

// Show examples on page load
showExampleLists();

async function ensureConnected() {
  if (!provider) throw new Error('MetaMask required');
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  const chainId = await provider.request({ method: 'eth_chainId' });
  // Base Sepolia: 0x14a34 (84532)
  if (chainId !== '0x14a34') {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x14a34' }]
    }).catch(async (err) => {
      if (err.code === 4902) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x14a34',
            chainName: 'Base Sepolia',
            rpcUrls: ['https://sepolia.base.org'],
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            blockExplorerUrls: ['https://sepolia.basescan.org']
          }]
        });
      } else { throw err; }
    });
  }
  const ethers = await import('https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js');
  const web3Provider = new ethers.providers.Web3Provider(provider);
  signer = web3Provider.getSigner(accounts[0]);
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

// Emoji mapping function - automatically detects what the bucket list item is about
function getEmojiForItem(item) {
  const text = item.toLowerCase();
  
  // Gambling & Casino
  if (text.includes('las vegas') || text.includes('vegas')) return '🎰';
  if (text.includes('gambl') || text.includes('casino') || text.includes('poker')) return '🎲';
  if (text.includes('macau') || text.includes('monaco')) return '🎰';
  
  // Cars & Vehicles
  if (text.includes('bugatti') || text.includes('ferrari') || text.includes('lamborghini') || text.includes('supercar') || text.includes('super car')) return '🏎️';
  if (text.includes('drive') || text.includes('driving') || (text.includes('car') && !text.includes('scar'))) return '🚗';
  if (text.includes('motorcycle') || text.includes('motorcycle') || text.includes('motorbike')) return '🏍️';
  if (text.includes('race') && text.includes('car')) return '🏎️';
  
  // Music & Concerts
  if (text.includes('metallica') || text.includes('metal') || text.includes('rock concert') || text.includes('heavy metal')) return '🤘';
  if (text.includes('concert') || text.includes('festival') || text.includes('music')) return '🎵';
  if (text.includes('piano') || text.includes('learn music')) return '🎹';
  if (text.includes('guitar')) return '🎸';
  
  // Travel & Nature - Aurora & Northern Lights (flexible for typos)
  if ((text.includes('northern') || text.includes('norhern') || text.includes('northen') || text.includes('norther')) && text.includes('light')) return '🌌';
  if (text.includes('aurora borealis') || (text.includes('aurora') && !text.includes('australis'))) return '🌌';
  if (text.includes('light') && (text.includes('northern') || text.includes('aurora') || text.includes('polar') || text.includes('norhern') || text.includes('northen'))) return '🌌';
  
  // General Travel
  if (text.includes('travel') || text.includes('visit')) return '✈️';
  if (text.includes('mountain') || text.includes('hiking')) return '⛰️';
  if (text.includes('ocean') || text.includes('beach') || text.includes('sea')) return '🌊';
  if (text.includes('desert') || text.includes('sahara')) return '🏜️';
  if (text.includes('rainforest') || text.includes('jungle')) return '🌴';
  if (text.includes('iceland')) return '🧊';
  if (text.includes('tropical') || text.includes('island')) return '🏝️';
  
  // Cities & Countries - Party & Nightlife
  if (text.includes('amsterdam') || text.includes('netherlands')) return '🍻';
  if (text.includes('ibiza') || text.includes('spain')) return '🕺';
  if (text.includes('miami') || text.includes('florida')) return '🏖️';
  if (text.includes('rio') || text.includes('brazil')) return '🎊';
  if (text.includes('thailand') || text.includes('bangkok') || text.includes('phuket')) return '🍜';
  if (text.includes('vietnam') || text.includes('ho chi minh') || text.includes('hanoi')) return '🍜';
  
  // Cities & Countries - Cultural
  if (text.includes('japan') || text.includes('tokyo') || text.includes('kyoto')) return '🌸';
  if (text.includes('italy') || text.includes('rome') || text.includes('venice')) return '🍝';
  if (text.includes('paris') || text.includes('france')) return '🗼';
  if (text.includes('new york') || text.includes('nyc')) return '🗽';
  if (text.includes('bali') || text.includes('indonesia')) return '🏄';
  if (text.includes('santorini') || text.includes('greece')) return '🏛️';
  if (text.includes('dubai') || text.includes('uae')) return '🏙️';
  if (text.includes('norway')) return '🇳🇴';
  if (text.includes('new zealand')) return '🗻';
  if (text.includes('sydney') || text.includes('australia')) return '🌉';
  if (text.includes('london') || text.includes('england')) return '🇬🇧';
  if (text.includes('amsterdam') || text.includes('canals')) return '🚤';
  if (text.includes('vienna') || text.includes('austria')) return '🎭';
  
  // Adventure & Sports
  if (text.includes('skydiving') || text.includes('parachute')) return '🪂';
  if (text.includes('bungee') || text.includes('jump')) return '🚀';
  if (text.includes('diving') || text.includes('scuba')) return '🤿';
  if (text.includes('surf') || text.includes('surfing')) return '🏄';
  if (text.includes('ski') || text.includes('snowboard')) return '⛷️';
  if (text.includes('snow')) return '❄️';
  if (text.includes('marathon') || text.includes('run')) return '🏃';
  if (text.includes('swim')) return '🏊';
  if (text.includes('climb')) return '🧗';
  
  // Learning & Skills
  if (text.includes('learn') || text.includes('study') || text.includes('course')) return '📚';
  if (text.includes('language')) return '🗣️';
  if (text.includes('cook') || text.includes('cooking') || text.includes('chef')) return '👨‍🍳';
  if (text.includes('code') || text.includes('programming')) return '💻';
  
  // Animals & Wildlife
  if (text.includes('safari') || text.includes('wildlife')) return '🦁';
  if (text.includes('whale') || text.includes('dolphin')) return '🐋';
  if (text.includes('penguin')) return '🐧';
  if (text.includes('elephant')) return '🐘';
  if (text.includes('shark')) return '🦈';
  
  // Food & Drink
  if (text.includes('fancy restaurant') || text.includes('fine dining') || text.includes('michelin')) return '🍽️';
  if (text.includes('restaurant') || text.includes('eat') || text.includes('dining')) return '🍽️';
  if (text.includes('wine') || text.includes('vineyard')) return '🍷';
  if (text.includes('coffee') || text.includes('cafe')) return '☕';
  if (text.includes('pizza')) return '🍕';
  if (text.includes('sushi')) return '🍣';
  if (text.includes('drink') || text.includes('beer') || text.includes('cocktail')) return '🍺';
  if (text.includes('champagne')) return '🥂';
  
  // Space & Astronomy
  if (text.includes('alien') || text.includes('ufo') || text.includes('extraterrestrial') || text.includes('see aliens')) return '👽';
  if (text.includes('space') || text.includes('planet') || text.includes('star') || text.includes('galaxy')) return '🚀';
  if (text.includes('moon landing') || text.includes('mars') || text.includes('space travel')) return '🌙';
  if (text.includes('eclipse') || text.includes('comet')) return '🌑';
  
  // Gaming & Entertainment (before general adventure)
  if (text.includes('playstation') || text.includes('play station') || text.includes('ps4') || text.includes('ps5')) return '🎮';
  if (text.includes('xbox') || text.includes('nintendo') || text.includes('switch')) return '🎮';
  if (text.includes('gaming') || text.includes('gamer') || text.includes('video game') || text.includes('videogame')) return '🎮';
  if (text.includes('play') && (text.includes('game') || text.includes('last of') || text.includes('god of') || text.includes('forza'))) return '🎮';
  
  // Entertainment
  if (text.includes('watch movie') || text.includes('cinema') || text.includes('film')) return '🎬';
  if (text.includes('theme park') || text.includes('disney') || text.includes('roller coaster')) return '🎢';
  
  // Extreme & Adventure
  if (text.includes('extreme') || text.includes('adventure')) return '🎢';
  
  // Lifestyle & Social
  if (text.includes('eğlen') || text.includes('have fun') || text.includes('fun time')) return '🎉';
  if (text.includes('party') || text.includes('celebrat') || text.includes('birthday')) return '🎉';
  if (text.includes('nightclub') || text.includes('club') || text.includes('dance')) return '💃';
  if (text.includes('nightlife') || text.includes('bar hop') || text.includes('pub crawl')) return '🍺';
  if (text.includes('spa') || text.includes('massage') || text.includes('relax')) return '🧖';
  if (text.includes('vacation') || text.includes('holiday')) return '🏖️';
  if (text.includes('weekend') && text.includes('getaway')) return '🏨';
  
  // Romantic & Couples
  if (text.includes('romantic') || text.includes('honeymoon') || text.includes('propose')) return '💕';
  if (text.includes('sunset') || text.includes('sunrise')) return '🌅';
  if (text.includes('stargazing') || text.includes('stars')) return '⭐';
  
  // Culture & Art
  if (text.includes('museum') || text.includes('gallery') || text.includes('art')) return '🖼️';
  if (text.includes('opera') || text.includes('theater') || text.includes('broadway')) return '🎭';
  if (text.includes('street art') || text.includes('graffiti')) return '🎨';
  
  // Achievement & Life Goals
  if (text.includes('graduate') || text.includes('degree')) return '🎓';
  if (text.includes('write') || text.includes('book') || text.includes('author')) return '📖';
  if (text.includes('start business') || text.includes('startup')) return '💼';
  if (text.includes('retire') || text.includes('retirement')) return '🌴';
  if (text.includes('passion') || text.includes('dream job')) return '💫';
  
  // Financial & Money
  if (text.includes('millionaire') || text.includes('rich') || text.includes('wealth')) return '💰';
  if (text.includes('invest') || text.includes('investment') || text.includes('save money')) return '💵';
  
  // Luxury & Expensive Things
  if (text.includes('luxury') || text.includes('expensive') || text.includes('first class')) return '💎';
  if (text.includes('yacht') || text.includes('boat')) return '🛥️';
  if (text.includes('private jet') || text.includes('helicopter')) return '🚁';
  if (text.includes('penthouse') || text.includes('mansion')) return '🏰';
  
  // Health & Fitness
  if (text.includes('gym') || text.includes('workout') || text.includes('fitness')) return '💪';
  if (text.includes('yoga') || text.includes('meditation')) return '🧘';
  if (text.includes('lose weight') || text.includes('diet')) return '⚖️';
  if (text.includes('healthy lifestyle')) return '🥗';
  
  // Technology & Modern Life
  if (text.includes('ai') || text.includes('machine learning') || text.includes('robot')) return '🤖';
  if (text.includes('vr') || text.includes('virtual reality') || text.includes('metaverse')) return '🥽';
  if (text.includes('cryptocurrency') || text.includes('bitcoin') || text.includes('blockchain')) return '₿';
  
  // Impossibly Fun & Fantasy
  if (text.includes('fly') || text.includes('flying') || text.includes('superpower')) return '🦸';
  if (text.includes('time travel') || text.includes('time machine')) return '⏰';
  if (text.includes('dragon') || text.includes('unicorn') || text.includes('magic')) return '🦄';
  if (text.includes('talking animal') || text.includes('dolphin interaction')) return '🐬';
  if (text.includes('see ghost') || text.includes('haunted') || text.includes('paranormal')) return '👻';
  
  // Extreme Competition & Shows
  if (text.includes('reality show') || text.includes('talent show') || text.includes('competition')) return '📺';
  if (text.includes('olympics') || text.includes('world cup') || text.includes('championship')) return '🏆';
  if (text.includes('boxing match') || text.includes('fight night')) return '🥊';
  
  // Photography & Social
  if (text.includes('instagram') || text.includes('photo shoot') || text.includes('viral video')) return '📸';
  if (text.includes('influencer') || text.includes('celebrity') || text.includes('meet famous')) return '⭐';
  if (text.includes('music video') || text.includes('mv')) return '🎥';
  
  // Education & Training
  if (text.includes('master') || text.includes('become expert') || text.includes('professional')) return '🎯';
  if (text.includes('phd') || text.includes('doctorate')) return '🔬';
  if (text.includes('teach') || text.includes('mentor') || text.includes('train others')) return '👨‍🏫';
  
  // Nature & Environment
  if (text.includes('rainbow') || text.includes('double rainbow')) return '🌈';
  if (text.includes('volcano') || text.includes('lava')) return '🌋';
  if (text.includes('waterfall') || text.includes('cascade')) return '💧';
  if (text.includes('hot spring') || text.includes('geyser')) return '♨️';
  if (text.includes('fall leaf') || text.includes('autumn') || text.includes('cherry blossom')) return '🍂';
  
  // Unique Experiences
  if (text.includes('nude beach') || text.includes('naturist') || text.includes('skinny dip')) return '🏖️';
  if (text.includes('nudist') || text.includes('free body')) return '🏝️';
  if (text.includes('prison tour') || text.includes('judgement') || text.includes('court')) return '⚖️';
  if (text.includes('police station') || text.includes('military') || text.includes('fire department')) return '🚓';
  if (text.includes('morgue') || text.includes('operation') || text.includes('see surgery')) return '🏥';
  
  // Social Causes & Impact
  if (text.includes('volunteer') || text.includes('charity') || text.includes('help people')) return '❤️';
  if (text.includes('save') && text.includes('animal') || text.includes('rescue')) return '🆘';
  if (text.includes('plant tree') || text.includes('environment') || text.includes('eco')) return '🌳';
  
  // Musical Instruments (beyond basic)
  if (text.includes('violin') || text.includes('cello')) return '🎻';
  if (text.includes('drums') || text.includes('drum set')) return '🥁';
  if (text.includes('saxophone') || text.includes('trumpet')) return '🎺';
  if (text.includes('ukulele') || text.includes('banjo')) return '🪕';
  
  // Water Sports (more specific)
  if (text.includes('kayak') || text.includes('canoe')) return '🛶';
  if (text.includes('paddle') || text.includes('standup paddle')) return '🏄';
  if (text.includes('kitesurf') || text.includes('wind surf')) return '🏖️';
  
  // Land Activities
  if (text.includes('cycling') || text.includes('bike tour') || text.includes('bicycle')) return '🚴';
  if (text.includes('motorcycle road trip') || text.includes('harley')) return '🏍️';
  if (text.includes('camping') || text.includes('tent')) return '⛺';
  if (text.includes('road trip') || text.includes('car trip')) return '🚗';
  
  // Spiritual & Mind
  if (text.includes('enlightenment') || text.includes('nirvana') || text.includes('zen')) return '🧘';
  if (text.includes('ayahuasca') || text.includes('psychedelic') || text.includes('shaman')) return '🍄';
  if (text.includes('meet guru') || text.includes('retreat')) return '🕉️';
  
  // Work & Career Bucket List
  if (text.includes('quit job') || text.includes('early retire')) return '📴';
  if (text.includes('become boss') || text.includes('manager') || text.includes('leadership')) return '👔';
  if (text.includes('work from') && text.includes('home')) return '🏡';
  
  // Default
  return '✨';
}

function renderList(element, items) {
  element.innerHTML = '';
  if (items.length === 0) {
    element.innerHTML = '<li style="padding: 12px; text-align: center; color: #94a3b8;">No items yet. Be the first to add one!</li>';
    return;
  }
  items.forEach((it, i) => {
    const li = document.createElement('li');
    const emoji = getEmojiForItem(it);
    li.innerHTML = `<span class="emoji">${emoji}</span><span>${i + 1}. ${it}</span>`;
    element.appendChild(li);
  });
}

async function refreshMine() {
  if (!contract) return;
  const addr = await signer.getAddress();
  const items = await contract.getItems(addr);
  renderList(myList, items);
}

connectBtn.onclick = async () => {
  connectBtn.disabled = true;
  const originalText = connectBtn.textContent;
  connectBtn.innerHTML = '<span class="loading"></span>Connecting...';
  try {
    await ensureConnected();
    connectBtn.innerHTML = '✅ Connected';
    connectBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
    await refreshMine();
  } catch (e) {
    showNotification(e.message || e, 'error');
    connectBtn.textContent = originalText;
    connectBtn.disabled = false;
  }
};

addBtn.onclick = async () => {
  if (!contract) return showNotification('Please connect wallet first', 'error');
  const text = itemInput.value.trim();
  if (!text) return showNotification('Please enter a bucket list item', 'warning');
  try {
    addBtn.disabled = true;
    addBtn.innerHTML = '<span class="loading"></span>Adding...';
    
    // Call addItem with payment (0.0001 ETH)
    const tx = await contract.addItem(text, { value: FEE_AMOUNT });
    showNotification('Transaction sent! Waiting for confirmation...', 'info');
    await tx.wait();
    itemInput.value = '';
    
    // Add user to community cache and save to localStorage
    const userAddress = await signer.getAddress();
    if (!realCommunityAddresses.includes(userAddress)) {
      realCommunityAddresses.push(userAddress);
      localStorage.setItem('bucketListCommunity', JSON.stringify(realCommunityAddresses));
    }
    
    showNotification('Item added successfully! 🎉 (Paid 0.0001 ETH)', 'success');
    await refreshMine();
  } catch (e) {
    showNotification(e.data?.message || e.message || e, 'error');
  } finally {
    addBtn.disabled = false;
    addBtn.textContent = 'Add';
  }
};

refreshMineBtn.onclick = refreshMine;

clearMineBtn.onclick = async () => {
  if (!contract) return showNotification('Please connect wallet first', 'error');
  if (!confirm('Are you sure you want to clear all your bucket list items?')) return;
  try {
    clearMineBtn.disabled = true;
    clearMineBtn.innerHTML = '<span class="loading"></span>Clearing...';
    const tx = await contract.clearMyItems();
    showNotification('Transaction sent! Waiting for confirmation...', 'info');
    await tx.wait();
    showNotification('All items cleared successfully! 🗑️', 'success');
    await refreshMine();
  } catch (e) {
    showNotification(e.data?.message || e.message || e, 'error');
  } finally {
    clearMineBtn.disabled = false;
    clearMineBtn.textContent = 'Clear';
  }
};

viewBtn.onclick = async () => {
  const addr = addressInput.value.trim();
  if (!addr) {
    // If no address entered, show example lists
    showExampleLists();
    showNotification('Showing example lists! Enter an address to view specific lists.', 'info');
    return;
  }
  try {
    viewBtn.disabled = true;
    viewBtn.innerHTML = '<span class="loading"></span>Loading...';
    const ethers = await import('https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js');
    const readProvider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
    const readContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, readProvider);
    const items = await readContract.getItems(addr);
    renderList(otherList, items);
    
    // Add address to community cache if valid
    if (items.length > 0 && !realCommunityAddresses.includes(addr)) {
      realCommunityAddresses.push(addr);
      localStorage.setItem('bucketListCommunity', JSON.stringify(realCommunityAddresses));
    }
    
    if (items.length === 0) {
      showNotification('No items found for this address.', 'warning');
    } else {
      showNotification(`Found ${items.length} items for this address`, 'success');
    }
  } catch (e) {
    showNotification(e.message || e, 'error');
  } finally {
    viewBtn.disabled = false;
    viewBtn.textContent = 'View';
  }
};

browseExamplesBtn.onclick = () => {
  showExampleLists();
  addressInput.value = '';
  showNotification('Browse community examples!', 'info');
};

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}





