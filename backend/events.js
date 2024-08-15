// backend/events.js
import { EventEmitter } from "events";

const transactionEmitter = new EventEmitter();

export default transactionEmitter;
