Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_connection_Connection = require("./Connection.js");
const require_network_connection_AbridgedCodec = require("./AbridgedCodec.js");
const require_network_connection_FullCodec = require("./FullCodec.js");
const require_network_connection_IntermediateCodec = require("./IntermediateCodec.js");
const require_network_connection_Obfuscation = require("./Obfuscation.js");
const require_compat_network_connection_WebProxy = require("../../compat/network/connection/WebProxy.js");
exports.AbridgedPacketCodec = require_network_connection_AbridgedCodec.AbridgedPacketCodec;
exports.Connection = require_network_connection_Connection.Connection;
exports.ConnectionTCPAbridged = require_network_connection_AbridgedCodec.ConnectionTCPAbridged;
exports.ConnectionTCPFull = require_network_connection_FullCodec.ConnectionTCPFull;
exports.ConnectionTCPIntermediate = require_network_connection_IntermediateCodec.ConnectionTCPIntermediate;
exports.ConnectionTCPObfuscated = require_network_connection_Obfuscation.ConnectionTCPObfuscated;
exports.ConnectionTCPPaddedIntermediate = require_network_connection_IntermediateCodec.ConnectionTCPPaddedIntermediate;
exports.ConnectionWebProxy = require_compat_network_connection_WebProxy.ConnectionWebProxy;
exports.FullPacketCodec = require_network_connection_FullCodec.FullPacketCodec;
exports.IntermediatePacketCodec = require_network_connection_IntermediateCodec.IntermediatePacketCodec;
exports.ObfuscatedConnection = require_network_connection_Obfuscation.ObfuscatedConnection;
exports.ObfuscatedIO = require_network_connection_Obfuscation.ObfuscatedIO;
exports.PacketCodec = require_network_connection_Connection.PacketCodec;
exports.PaddedIntermediatePacketCodec = require_network_connection_IntermediateCodec.PaddedIntermediatePacketCodec;
