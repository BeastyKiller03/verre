// /netlify/functions/twilio-sms.js

const querystring = require("querystring");

/**
 * Very simple in-memory "inventory" just for demo.
 * In production, replace this with a real database.
 */
const inventory = {
  // storeId: { itemName: quantity }
  game_galaxy: {
    "ps2 slim": 5,
    "ps5": 2,
  },
};

/**
 * Map phone numbers to store IDs (for now, hard-coded).
 * Later we’ll move this to a database or config.
 */
const phoneToStore = {
  "+16269229470": "game_galaxy", // replace with your own phone for testing
};

exports.handler = async (event) => {
  // Twilio sends data as application/x-www-form-urlencoded
  const params = querystring.parse(event.body);

  const from = params.From;   // e.g. "+15551234567"
  const body = (params.Body || "").trim();

  console.log("Incoming SMS from:", from, "body:", body);

  const storeId = phoneToStore[from];

  if (!storeId) {
    return twimlResponse(
      "Your number is not registered with SoCal Video Games. Please contact support to set up access."
    );
  }

  // Simple command parser: set / add / sold / check / help
  const responseText = handleCommand(storeId, body);

  return twimlResponse(responseText);
};

function handleCommand(storeId, body) {
  const lower = body.toLowerCase();

  if (lower === "help") {
    return [
      "SoCal Inventory Bot Commands:",
      "- set <item> <qty> (ex: set ps2 slim 10)",
      "- add <item> <qty> (ex: add ps2 slim 3)",
      "- sold <item> <qty> (ex: sold ps2 slim 1)",
      "- check <item> (ex: check ps2 slim)",
    ].join("\n");
  }

  const parts = lower.split(/\s+/);

  const command = parts[0];

  if (["set", "add", "sold"].includes(command)) {
    // set ps2 slim 10 -> ["set", "ps2", "slim", "10"]
    const qtyStr = parts[parts.length - 1];
    const qty = parseInt(qtyStr, 10);

    if (isNaN(qty)) {
      return 'I couldn’t find a quantity. Example: "set ps2 slim 10"';
    }

    const itemName = parts.slice(1, -1).join(" ").trim();
    if (!itemName) {
      return "Please specify an item name. Example: set ps2 slim 10";
    }

    return handleQuantityUpdate(storeId, command, itemName, qty);
  }

  if (command === "check") {
    const itemName = parts.slice(1).join(" ").trim();
    if (!itemName) {
      return 'Please specify an item. Example: "check ps2 slim"';
    }

    const storeInventory = inventory[storeId] || {};
    const current = storeInventory[itemName] ?? 0;

    return `For ${prettyStoreName(storeId)}: "${itemName}" is currently at ${current}.`;
  }

  return 'I didn’t understand that. Text "help" for examples.';
}

function handleQuantityUpdate(storeId, command, itemName, qty) {
  if (!inventory[storeId]) inventory[storeId] = {};
  const storeInventory = inventory[storeId];

  const current = storeInventory[itemName] ?? 0;
  let newQty = current;

  if (command === "set") {
    newQty = qty;
  } else if (command === "add") {
    newQty = current + qty;
  } else if (command === "sold") {
    newQty = Math.max(0, current - qty);
  }

  storeInventory[itemName] = newQty;

  const actionWord =
    command === "set" ? "set" : command === "add" ? "increased" : "decreased";

  return [
    `For ${prettyStoreName(storeId)}:`,
    `"${itemName}" was ${current}, now ${actionWord} to ${newQty}.`,
  ].join(" ");
}

function prettyStoreName(storeId) {
  if (storeId === "game_galaxy") return "Game Galaxy";
  return storeId;
}

function twimlResponse(message) {
  const twiml = `
    <Response>
      <Message>${escapeXml(message)}</Message>
    </Response>
  `.trim();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml",
    },
    body: twiml,
  };
}

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
