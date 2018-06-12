from unittest import TestCase
from unittest.mock import patch
from tansu import fib_gen as fb

class FibGenTest3(TestCase):

    def test_get_depth_prompt(self):
        """ Test: Checks that correct prompt is called .
        This test uses Mock input.
        """
        with patch('builtins.input') as mocked_prompt:
            fb.get_depth()
            mocked_prompt.assert_called_with('Enter Fibonacci sequence numbers (integer between 1 to 1000): ')

    def test_get_fib_seq_one(self):
        """ Test: The sequence output should start from 1 """
        expected = [1]
        the_seq = []
        for num in fb.get_fib_seq(1):
            the_seq.append(num)
        self.assertEqual(expected, the_seq)

    def test_get_fib_seq_one_negative(self):
        """ Test: The sequence should not start from 0 """
        expected = [0]
        the_seq = []
        for num in fb.get_fib_seq(1):
            the_seq.append(num)
        self.assertNotEqual(expected, the_seq)

    def test_get_fib_seq_twenty(self):
        """ Test: The first 21 sequences, sanity check. """
        expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]
        the_seq = []
        for num in fb.get_fib_seq(20): # Note that this uses fb
            the_seq.append(num)
        self.assertEqual(expected, the_seq)
