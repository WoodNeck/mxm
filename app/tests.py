import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vuedj.settings")
django.setup()

from django.test import TestCase

class TestView(TestCase):
    """Test the views of the application"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_index_view(self):
        response = self.client.get('/mxms/')
        self.assertEqual(response.status_code, 200)
