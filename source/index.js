class BitCodec {
	constructor() {
		this.setData("");
	}

	setData(d) {
		this.error_flag = false;
		this.in_pos = 0;
		this.nbits = 0;
		this.data = d;
		this.bits = 0;
		this.crc = 0;
	}

	crcStr() {
		return (
			this.c64(this.crc & 63) +
			this.c64((this.crc >> 6) & 63) +
			this.c64((this.crc >> 12) & 63) +
			this.c64((this.crc >> 18) & 63)
		);
	}

	read(n) {
		while (this.nbits < n) {
			var c = this.d64(this.data.charAt(this.in_pos++));
			if (this.in_pos > this.data.length || c == null) {
				this.error_flag = true;
				return -1;
			}
			this.crc ^= c;
			this.crc &= 0xffffff;
			this.crc *= c;
			this.nbits += 6;
			this.bits <<= 6;
			this.bits |= c;
		}
		this.nbits -= n;
		return (this.bits >> this.nbits) & ((1 << n) - 1);
	}

	nextPart() {
		this.nbits = 0;
	}

	hasError() {
		return this.error_flag;
	}

	toString() {
		if (this.nbits > 0) this.write(6 - this.nbits, 0);
		return this.data;
	}

	write(n, b) {
		this.nbits += n;
		this.bits <<= n;
		this.bits |= b;
		var k;
		while (this.nbits >= 6) {
			this.nbits -= 6;
			k = (this.bits >> this.nbits) & 63;
			this.crc ^= k;
			this.crc &= 0xffffff;
			this.crc *= k;
			this.data += this.c64(k);
		}
	}

	ord(code) {
		return code.charCodeAt(0);
	}

	chr(code) {
		return String.fromCharCode(code);
	}

	d64(code) {
		var chars = "$azAZ_"; // anti obfu
		if (code >= chars.charAt(1) && code <= chars.charAt(2))
			return this.ord(code) - this.ord(chars.charAt(1));
		if (code >= chars.charAt(3) && code <= chars.charAt(4))
			return this.ord(code) - this.ord(chars.charAt(3)) + 26;
		if (code >= "0" && code <= "9")
			return this.ord(code) - this.ord("0") + 52;
		if (code == "-") return 62;
		if (code == chars.charAt(5)) return 63;
		return null;
	}

	c64(code) {
		var chars = "$aA_"; // anti obfu
		if (code < 0) return "?";
		if (code < 26) return this.chr(code + this.ord(chars.charAt(1)));
		if (code < 52) return this.chr(code - 26 + this.ord(chars.charAt(2)));
		if (code < 62) return this.chr(code - 52 + this.ord("0"));
		if (code == 62) return "-";
		if (code == 63) return chars.charAt(3);
		return "?";
	}
}

module.exports = BitCodec;
