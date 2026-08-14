# Typebot SDK exists test

import pytest
from typebot_sdk import TypebotSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TypebotSDK.test(None, None)
        assert testsdk is not None
