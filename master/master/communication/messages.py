

def construct(perspective=None, is_dead=None):
    message = {}

    if perspective:
        message['perspective'] = perspective

    if is_dead:
        message['is_dead'] = True

    return message
