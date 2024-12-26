const PARAMS = Deno.args;
console.log(PARAMS);
const deviceOrIdParamIdx = PARAMS.findIndex((arg) =>
  arg.includes("--device-or-id")
);
const DEVICE_NAME_OR_ID =
  (deviceOrIdParamIdx >= 0 ? PARAMS[deviceOrIdParamIdx] : undefined) || "";
console.log(DEVICE_NAME_OR_ID);

// validations
if (DEVICE_NAME_OR_ID === "") {
  console.error(
    'DEVICE_NAME_OR_ID is required, example: --device-or-id="11_or_ABCD1234:00 00A0:1234"'
  );
  Deno.exit(1);
}

const FINAL_DEVICE_NAME_OR_ID = DEVICE_NAME_OR_ID.split("=")[1];

const MODE: "enable" | "disable" =
  PARAMS.findIndex((arg) => arg.includes("--disable")) >= 0
    ? "disable"
    : "enable";

// run xinput and verify the device exists
const checkCmd = new Deno.Command("xinput", {
  args: ["list", FINAL_DEVICE_NAME_OR_ID],
});

const { code, stderr } = await checkCmd.output();
if (code !== 0) {
  console.error(code, new TextDecoder().decode(stderr));
} else {
  const runCmd = new Deno.Command("xinput", {
    args: [MODE, FINAL_DEVICE_NAME_OR_ID],
  });
  const { code, stdout, stderr } = await runCmd.output();
  if (code !== 0) {
    console.error(code, new TextDecoder().decode(stderr));
  } else {
    console.log(new TextDecoder().decode(stdout));
    console.log("Done!");
  }
}
