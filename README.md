# Touchscreen-disabler

A project built with Deno to allow for turning off the touchscreen on my Linux laptop easily

### Getting Started

Download the latest-version of the binary from the [releases](https://github.com/ssisaias/touchscreen-disabler/releases) page and place it in your path.

Or build it from source:

```
$ git clone https://github.com/matt-matt-matt/touchscreen-disabler.git
$ cd touchscreen-disabler
$ deno compile --allow-read --allow-run --allow-env --output=target/touchscreen-disabler main.ts
```

optionally, for windows, add the icon:

```
$ deno compile --allow-read --allow-run --allow-env --output=target/touchscreen-disabler --icon=icon.ico main.ts
```

### Usage
Run xinput and get the touchscreen device name or Id
```
$ xinput
⎡ Virtual core pointer                     id=2    [master pointer  (3)]
⎜   ↳ ABCD1234:00 00A0:1234                id=11	[slave  pointer  (2)]
```


To run the program, simply run the binary from the command line:
```
$ ./touchscreen-disabler --device-or-id=11 --disable
```

To re-enable the touchscreen, run with the `--enable` flag:
```
$ ./touchscreen-disabler --device-or-id="ABCD1234:00 00A0:1234" --enable
```

### Auto-starting
Tested on Pop-os 22.04 with Gnome
In gnome open the 'Startup Applications' and add the following to the command:
```
$ touchscreen-disabler --device-or-id="ABCD0000:00 AB12:1234" --disable
```

Or if you have built from source:

```
$ ~/path_tothebuild/target/touchscreen-disabler --device-or-id="ABCD0000:00 AB12:1234" --disable
```

If you have tested on another distros and other methods, open a PR so we can add it here.

### LICENSE
MIT