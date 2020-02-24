import fileinput, random, re, sys

def sanitize(item):
    if "[" in item:
        item = item.split("[")[1]
    if "]" in item:
        item = item.split("]")[0]
    return item


def reformat_v(item):
    #item is a list[3] of floats
    res = "v "
    for i in item:
        res= res + str(i) + " "
    res += "\r\n"
    return res

def reformat_f(line):
    res = "f "
    for i in line:
        res = res + str(i) + " "
    res += "\r\n"
    return res

def main():
    file_to_fuck = sys.argv[1]
    open(file_to_fuck)
    filefucked = open(file_to_fuck.split(".")[0]+"_fkd.obj", "w+")
    for line in fileinput.input(file_to_fuck):
        number = random.randrange(16)+1
        if fileinput.filelineno()%number==0:
            if line[0]=="v":
                print("v")
                ver = str(line[2:])
                ver=ver.split()
                ver=re.sub(r"'*","",str(ver))
                ver=ver.split(",")
                for i in range(len(ver)):
                    ver[i]=sanitize(ver[i])
                    ver[i]= '{:e}'.format(float(ver[i]) + 0.02)
                ver_to_line = reformat_v(ver)
            if line[0]=="f":
                print("f")
                new_line=str(line[2:])
                new_line=new_line.split()
                for i in range(len(new_line)):
                    new_line[i] = int(new_line[i]) + random.randrange(50)
                ver_to_line = reformat_f(new_line)
            filefucked.write(ver_to_line)
        else:
            filefucked.write(line)
    filefucked.close()
main()
