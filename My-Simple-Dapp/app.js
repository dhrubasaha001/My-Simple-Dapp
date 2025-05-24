let contract;
let signer;

// Replace this with your deployed contract address
const contractAddress = "0xYourContractAddressHere";

// Load ABI from abi.json
fetch("abi.json")
  .then(response => response.json())
  .then(abi => {
    // Connect to Ethereum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
  });

async function connectWallet() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  alert("✅ Wallet connected!");
}

async function setData() {
  const input = document.getElementById("inputData").value;
  if (!input) {
    alert("❌ Please enter a number");
    return;
  }

  try {
    const tx = await contract.set(Number(input));
    await tx.wait();
    alert("✅ Data sent to smart contract!");
  } catch (error) {
    console.error(error);
    alert("❌ Error sending data");
  }
}

async function getData() {
  try {
    const result = await contract.get();
    document.getElementById("output").innerText = `📥 Stored Value: ${result}`;
  } catch (error) {
    console.error(error);
    alert("❌ Error reading data");
  }
}
