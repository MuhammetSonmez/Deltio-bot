target = "**kwargs"
bots = ["*args", "*argss", "*argsss", "*argssss", "*argsssss", "*argssssss", "*argsssssss", "*argssssssss", "*argsssssssss"]

with open("core.js", "r", encoding="utf-8") as f:
    core = f.read()

for index in range(1, len(bots)+1):
    with open(f"bot{index}.js", "w", encoding="utf-8") as f:
        f.write(core.replace("*args", bots[index-1]))
    