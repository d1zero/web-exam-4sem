from faker import Faker
from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):
    def setUp(self) -> None:
        self.login_url = reverse('customuser-login')
        self.register_url = reverse('customuser-register')
        self.logout_url = reverse('customuser-logout')
        self.user_url = reverse('customuser-user')
        self.confirm_url = '/api/auth/confirm-register/'
        self.update_url = reverse('customuser-user-update')
        self.faker = Faker()

        self.user_data = {
            'email': self.faker.email(),
            'username': self.faker.simple_profile()['username'],
            'password': self.faker.password(length=8),
        }

        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()
