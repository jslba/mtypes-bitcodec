# [BitCodec][index] implement of BitCodec

![npm](https://img.shields.io/npm/v/mtypes-bitcodec?color=blue&style=flat)
![tests](https://img.shields.io/static/v1?label=tests&message=0%20passed&color=brightgreen&style=flat)
![GitHub](https://img.shields.io/github/license/jslba/mtypes-bitcodec?style=flat)

An implementation of BitCodec.   
It's a class initially used in some [Motion Twin][1] projects ; that was written
in [Motion Types][mtypes] a programing  language developped by [Nicolas Cannasse
][ncannasse] at [Motion Twin][1] in 2004-2005.

> **Note**   
> If you are looking  for how to  use it, you  can look at some  examples in the
> [unit tests][unittests].

## Constructor

```hx
new BitCodec()
```

## Variables

```hx
public error_flag: Bool
```

```hx
public in_pos: Int
```

```hx
public nbits: Int
```

```hx
public data: String
```

```hx
public bits: Int
```

```hx
public crc: Int
```

## Methods

```hx
public setData(d: String): void
```

```hx
public crcStr(): String
```

```hx
public read(): Int
```

```hx
public nextPart(): void
```

```hx
public hasError(): Bool
```

```hx
public toString(): String
```

```hx
public write(n: Int, b: Int): void
```

```hx
public ord(code: String): Int
```

```hx
public chr(code: Int): String
```

```hx
public d64(code: Int): String | null
```

```hx
public c64(code: Int): String
```

[1]: https://motion-twin.com/fr/
[index]: /source/index.js
[mtypes]: https://github.com/motion-twin/mtypes
[ncannasse]: https://github.com/ncannasse
[unittests]: /test/codec.test.js