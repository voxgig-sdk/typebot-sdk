# Typebot SDK utility: make_context

from projectname_sdk.core.context import TypebotContext


def make_context_util(ctxmap, basectx):
    return TypebotContext(ctxmap, basectx)
