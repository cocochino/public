#/mooshu/tansu/fib_gen.py


USER_PROMPT1 = 'Enter Fibonacci sequence numbers (integer between 1 to 1000): '
USER_PROMPT2 = 'Input must be between 1 to 1000. '

class FindFibWithGenerator:
    """
    Goal: Find Fibonnaci sequence to the nth that is specified by users.
    It demonstrates Python's Generator.
    It also is a base for Python unit test experiment.
    """

    def get_fib_seq(self, depth=1):
        """
        Calculate numbers in Fibonnaci sequence.
        :param depth: Integer. Depth of sequence, provided by user
        :return: Yields Fibonnaci numbers as it processes.
        """
        a, b = 1, 1 # Starting number both as 1
        for i in range(depth):
            yield a
            a, b = b, (a + b)

    def get_depth(self):
        """
        Obtain user input on sequence depth.
        :return: Depth as an Integer.
        """
        while True:
            #
            selection = input(USER_PROMPT1)
            print(selection)
            try:
                depth = int(selection)
                if depth < 1 or depth > 1000:
                    print(USER_PROMPT2)
                else:
                    print("Calculate {} sequences.".format(depth))
                    break
            except:
                print("Error: Could not process user input. Please enter integer.")
        return depth

def main():
    f = FindFibWithGenerator()
    sequence_depth = f.get_depth()
    # Note how the sequence is retrieved.
    for num in f.get_fib_seq(sequence_depth):
        print(num)

if __name__ == "__main__":
    main()