# Typebot SDK feature factory

from feature.base_feature import TypebotBaseFeature
from feature.test_feature import TypebotTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TypebotBaseFeature(),
        "test": lambda: TypebotTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
