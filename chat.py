filename = "chat.txt"


def get_chat():
    full_chat = []
    with open(filename) as file:
        for line in file:
            full_chat.append({"message": line.rstrip("\n\r")})
    return full_chat


def add_message(message):
    with open(filename, "a") as file:
        file.write(message + "\n")