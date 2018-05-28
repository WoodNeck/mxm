from .models import Tag, Clothes, MxM, Reply, Rating
from django.contrib.auth.models import User
import app.constants as constants
import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vuedj.settings")
django.setup()

from django.test import TestCase

class TestView(TestCase):
    """Test the views of the application"""
    def setUp(self):
        print('initializing')
        self.imageFile = open('media/jean.jpeg', 'rb')
        user1 = User.objects.create_superuser('Kim', '', 'password')
        user2 = User.objects.create_superuser('Lee', '', 'password')
        
        tags = Tag.objects
        
        clothes = Clothes.objects.create(owner=user1, image='media/jean.jpeg')
        clothes.tag.add(tags.get(pk=1))
        clothes = Clothes.objects.create(owner=user2, image='media/jean.jpeg')
        clothes.tag.add(tags.get(pk=2))
        clothes = Clothes.objects.create(owner=user1, image='media/jean.jpeg')
        clothes.tag.add(tags.get(pk=1))
        clothes.tag.add(tags.get(pk=20))
        clothes = Clothes.objects.create(owner=user2, image='media/jean.jpeg')
        clothes.tag.add(tags.get(pk=3))

        clothes = Clothes.objects

        mxm = MxM.objects.create(owner=user1, 
            description='Hello', is_on_recommendation=True, is_on_evaluation=True)
        mxm.clothes.add(clothes.get(pk=1))
        mxm.clothes.add(clothes.get(pk=3))
        mxm = MxM.objects.create(owner=user2, 
            description='Hello', is_on_evaluation=True)
        mxm.clothes.add(clothes.get(pk=2))
        mxm = MxM.objects.create(owner=user1,
            description='Hi', is_on_recommendation=True)
        mxm.clothes.add(clothes.get(pk=1))

        mxms = MxM.objects

        Reply.objects.create(author=user2, reply_content='Good!', 
            mxm=mxms.get(pk=1))
        Reply.objects.create(author=user2, reply_content='Nice!',
            mxm=mxms.get(pk=3))
        Rating.objects.create(author=user1, stars=4, mxm=mxms.get(pk=2))
        Rating.objects.create(author=user2, stars=5, mxm=mxms.get(pk=1))

    def tearDown(self):
        pass

    # test for /api/clothes/
    def test_api_clothes(self):
        print('testing for /api/clothes/')
        # test for GET method
        response = self.client.get('/api/clothes/')
        self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/clothes/', 
            {'owner': '1', 'image': self.imageFile, 'tag': [3, 20]})
        self.assertEqual(response.status_code, 201)

    # test for /api/clothes/(id)/
    def test_api_clothes_id(self):
        print('testing for /api/clothes/(id)/')
        # test for GET method
        for clothes in Clothes.objects.all():
            response = self.client.get('/api/clothes/' + str(clothes.id) + '/')
            self.assertEqual(response.status_code, 200)

        # test for PATCH method
        response = self.client.patch('/api/clothes/3/',
            '{\"tag\": [3, 20]}', content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

        # test for DELETE method
        response = self.client.delete('/api/clothes/3/')
        self.assertEqual(response.status_code, 204)

    # test for /api/clothes/mxm=(id)/
    def test_api_clothes_mxm_id(self):
        print('testing for /api/clothes/mxm=(id)/')
        # test for GET method
        for mxm in MxM.objects.all():
            response = self.client.get('/api/clothes/mxm=' + str(mxm.id) + '/')
            self.assertEqual(response.status_code, 200)

    # test for /api/clothes/user=(id)/page=(page)/
    def test_api_clothes_user_id_page_page(self):
        print('testing for /api/clothes/user=(id)/page=(page)/')
        cpp = constants.clothes_per_page
        # test for GET method
        for user in User.objects.all():
            maxPage = int((len(user.clothes.all()) + cpp - 1) / cpp)
            for page in range(1, maxPage + 1):
                response = self.client.get('/api/clothes/user=' + str(user.id) + 
                    '/page=' + str(page) + '/')
                self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/clothes/user=1/page=1/',
            {'image': self.imageFile, 'tag': [4, 25]})
        self.assertEqual(response.status_code, 201)

    # test for /api/mxms/
    def test_api_mxms(self):
        print('testing for /api/mxms/')
        # test for GET method
        response = self.client.get('/api/mxms/')
        self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/mxms/',
            {'owner': '2', 'clothes':[2,4], 'description': 'Hello', 'is_on_evaluation': True})
        self.assertEqual(response.status_code, 201)

    # test for /api/mxms/(id)/
    def test_api_mxms_id(self):
        print('testing for /api/mxms/(id)/')
        # test for GET method
        for mxm in MxM.objects.all():
            response = self.client.get('/api/mxms/' + str(mxm.id) + '/')
            self.assertEqual(response.status_code, 200)

        # test for PATCH method
        response = self.client.patch('/api/mxms/2/',
            '{\"description\": \"Hi\"}', content_type = 'application/json')
        print(response.content)
        self.assertEqual(response.status_code, 200)

        # test for DELETE method
        response = self.client.delete('/api/mxms/2/')
        self.assertEqual(response.status_code, 204)

    # test for /api/mxms/user=(id)/page=(page)/
    def test_api_mxms_user_id_page_page(self):
        print('testing for /api/mxms/user=(id)/page=(page)/')
        # test for GET method
        mpp = constants.mxms_per_page
        for user in User.objects.all():
            maxPage = int((len(user.mxms.all()) + mpp - 1) / mpp)
            for page in range(1, maxPage + 1):
                response = self.client.get('/api/mxms/user=' + str(user.id) +
                    '/page=' + str(page) + '/')
                self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/mxms/user=1/page=1/',
            {'description': 'hello', 'clothes':[1], 'is_on_recommendation': True})
        self.assertEqual(response.status_code, 201)

    # test for /api/ratings/
    def test_api_ratings(self):
        print('testing for /api/ratings/')
        # test for GET method
        response = self.client.get('/api/ratings/')
        self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/ratings/',
            {'author': '2', 'stars': 5, 'mxm': 1})
        self.assertEqual(response.status_code, 201)

    # test for /api/ratings/(id)/
    def test_api_ratings_id(self):
        print('testing for /api/ratings/(id)/')
        # test for GET method
        for rating in Rating.objects.all():
            response = self.client.get('/api/ratings/' + str(rating.id) + '/')
            self.assertEqual(response.status_code, 200)

        # test for PATCH method
        response = self.client.patch('/api/ratings/1/', 
            '{\"stars\": 4}', content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

        # test for DELETE method
        response = self.client.delete('/api/ratings/2/')
        self.assertEqual(response.status_code, 204)

    # test for /api/ratings/mxm=(id)/page=(page)/
    def test_api_ratings_mxm_id_page_page(self):
        print('testing for /api/ratings/mxm=(id)/page=(page)/')
        rpp = constants.ratings_per_page
        # test for GET method
        for mxm in MxM.objects.all():
            maxPage = int((len(mxm.ratings.all()) + rpp - 1) / rpp)
            for page in range(1, maxPage + 1):
                response = self.client.get('/api/ratings/mxm=' + str(mxm.id) +
                    '/page=' + str(page) + '/')
                self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/ratings/mxm=2/page=1/',
            {'author': '1', 'stars': 4})
        self.assertEqual(response.status_code, 201)

    # test for /api/replies/
    def test_api_replies(self):
        print('testing for /api/replies/')
        # test for GET method
        response = self.client.get('/api/replies/')
        self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/replies/',
            {'author': '2', 'reply_content': 'Good!', 'mxm': 1})
        self.assertEqual(response.status_code, 201)

    # test for /api/replies/(id)/
    def test_api_replies_id(self):
        print('testing for /api/replies/(id)/')
        # test for GET method
        for reply in Reply.objects.all():
            response = self.client.get('/api/replies/' + str(reply.id) + '/')
            self.assertEqual(response.status_code, 200)

        # test for PATCH method
        response = self.client.patch('/api/replies/1/',
            '{\"reply_content\": \"Nice!\"}', content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

        # test for DELETE method
        response = self.client.delete('/api/replies/2/')
        self.assertEqual(response.status_code, 204)

    # test for /api/replies/mxm=(id)/page=(page)/
    def test_api_replies_mxm_id_page_page(self):
        print('testing for /api/replies/mxm=(id)/page=(page)/')
        rpp = constants.replies_per_page
        # test for GET method
        for mxm in MxM.objects.all():
            maxPage = int((len(mxm.replies.all()) + rpp - 1) / rpp)
            for page in range(1, maxPage + 1):
                response = self.client.get('/api/replies/mxm=' + str(mxm.id) +
                    '/page=' + str(page) + '/')
                self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/replies/mxm=2/page=1/',
            {'author': '1', 'reply_content': 'Good!'})
        self.assertEqual(response.status_code, 201)

    # test for /api/tag/
    def test_api_tag(self):
        print('testing for /api/tag/')
        # test for GET method
        response = self.client.get('/api/tag/')
        self.assertEqual(response.status_code, 200)

        # test for POST method
        response = self.client.post('/api/tag/',
            {'type': 'Color', 'content':'sky_blue'})
        self.assertEqual(response.status_code, 201)

    # test for /api/users/
    def test_api_users(self):
        print('testing for /api/users/')
        # test for GET method
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)

    # test for /api/users/(id)/
    def test_api_users_id(self):
        print('testing for /api/users/(id)/')
        for user in User.objects.all():
            response = self.client.get('/api/users/' + str(user.id) + '/')
            self.assertEqual(response.status_code, 200)
