# Typebot SDK feature factory

from typebot_sdk.feature.base_feature import TypebotBaseFeature
from typebot_sdk.feature.test_feature import TypebotTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TypebotBaseFeature(),
        "test": lambda: TypebotTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
