// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-media-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String,
  gender: String,
  age: Number,
  phoneNumber: String,
  email: String,
  passwordHash: String,
});

const User = mongoose.model('User', userSchema);

// Define tweet schema and model
const tweetSchema = new mongoose.Schema({
  userId: String,
  createdDate: Date,
  message: String,
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Middleware to parse request body as JSON
app.use(bodyParser.json());

// User Registration API
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, userId, gender, age, phoneNumber, email, password } = req.body;

  // Hash the password using bcrypt
  const passwordHash = await bcrypt.hash(password, 10);

  // Create a new user document
  const user = new User({
    firstName,
    lastName,
    userId,
    gender,
    age,
    phoneNumber,
    email,
    passwordHash,
  });
