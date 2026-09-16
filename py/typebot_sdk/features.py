# Typebot SDK feature factory

from typebot_sdk.feature.base_feature import TypebotBaseFeature
from typebot_sdk.feature.debug_feature import TypebotDebugFeature
from typebot_sdk.feature.idempotency_feature import TypebotIdempotencyFeature
from typebot_sdk.feature.metrics_feature import TypebotMetricsFeature
from typebot_sdk.feature.paging_feature import TypebotPagingFeature
from typebot_sdk.feature.ratelimit_feature import TypebotRatelimitFeature
from typebot_sdk.feature.retry_feature import TypebotRetryFeature
from typebot_sdk.feature.test_feature import TypebotTestFeature
from typebot_sdk.feature.timeout_feature import TypebotTimeoutFeature


_FEATURES = {
    "base": lambda: TypebotBaseFeature(),
    "debug": lambda: TypebotDebugFeature(),
    "idempotency": lambda: TypebotIdempotencyFeature(),
    "metrics": lambda: TypebotMetricsFeature(),
    "paging": lambda: TypebotPagingFeature(),
    "ratelimit": lambda: TypebotRatelimitFeature(),
    "retry": lambda: TypebotRetryFeature(),
    "test": lambda: TypebotTestFeature(),
    "timeout": lambda: TypebotTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
