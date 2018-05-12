import sys
import fileinput
import re


def static_repl(match):
    return "{{% static '{}' %}}".format(match.group().replace('/static/', ''))

file = 'templates/index.html'

with open(file, "r+") as f:
    s = f.read()
    f.seek(0)
    f.write("{% load staticfiles %}\n" + s)

for i, line in enumerate(fileinput.input(file, inplace=1)):
    replaced_line = re.sub(r'\/static\/(\w+\/).(\w+\.)+(js|css)', static_repl, line)
    sys.stdout.write(replaced_line)
