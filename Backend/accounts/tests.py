from django.test import TestCase, Client
from django.urls import reverse

from accounts.models import User
from accounts.serializers import UserSerializer

ID = 1
EMAIL = 'test_email@test.com'
PASSWORD = 'test_password'
FIRST_NAME = 'first name'
LAST_NAME = 'last name'
SCHOOL = 'test school'
ADDRESS = 'test address'
PHONE = '1234567890'


class ModelsTestCases(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, SCHOOL, ADDRESS, PHONE)

    def test_create_user_create_expected_user(self):
        actual = User.objects.get(email=EMAIL)
        self.assertEqual(actual.email, EMAIL)
        self.assertNotEqual(actual.password, PASSWORD)
        self.assertEqual(actual.first_name, FIRST_NAME)
        self.assertEqual(actual.last_name, LAST_NAME)
        self.assertEqual(actual.school, SCHOOL)
        self.assertEqual(actual.address, ADDRESS)
        self.assertEqual(actual.phone, PHONE)
        self.assertTrue(actual.is_active)
        self.assertFalse(actual.is_staff)
        self.assertFalse(actual.is_superuser)

    def tearDown(self):
        self.user.delete()


class SerializersTestCases(TestCase):
    def setUp(self):
        self.expected_data = {
            'id': ID,
            'email': EMAIL,
            'first_name': FIRST_NAME,
            'last_name': LAST_NAME,
            'school': SCHOOL,
            'address': ADDRESS,
            'phone': PHONE
        }

        self.user = User.objects.create_user(EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, SCHOOL, ADDRESS, PHONE)
        self.serializer = UserSerializer(instance=self.user)

    def test_user_serializer_contains_expected_fields(self):
        actual_data = self.serializer.data

        self.assertEqual(actual_data['id'], self.expected_data['id'])
        self.assertEqual(actual_data['email'], self.expected_data['email'])
        self.assertEqual(actual_data['first_name'], self.expected_data['first_name'])
        self.assertEqual(actual_data['last_name'], self.expected_data['last_name'])
        self.assertEqual(actual_data['school'], self.expected_data['school'])
        self.assertEqual(actual_data['address'], self.expected_data['address'])
        self.assertEqual(actual_data['phone'], self.expected_data['phone'])

    def tearDown(self):
        self.user.delete()


class ViewsTestCases(TestCase):
    def setUp(self):
        self.client = Client()

    def test_register_success(self):
        request = {
            'email': EMAIL,
            'password': PASSWORD,
            'first_name': FIRST_NAME,
            'last_name': LAST_NAME,
            'school': SCHOOL,
            'address': ADDRESS,
            'phone': PHONE
        }

        response = self.client.post(reverse('register'), request)

        self.assertEqual(response.status_code, 200)

    def test_login_success(self):
        User.objects.create_user(EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, SCHOOL, ADDRESS, PHONE)
        request = {
            'username': EMAIL,
            'password': PASSWORD
        }

        response = self.client.post(reverse('login'), request)

        self.assertEqual(response.status_code, 200)