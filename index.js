const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.log('Could not connect to mongoDB ', error));

const course_schema = mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  is_published: Boolean
});

const Course = mongoose.model('Course', course_schema);

async function create_course(){
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    is_published: true
  });

  const result = await course.save();
  console.log(result);
}

// create_course();

async function get_courses(){
  // const courses = await Course.find();    //Gets all courses
  const courses = await Course.find({author: 'Mosh'})
                              .limit(10)
                              .sort({name: 1})
                              .select({name: 1, tags: 1});
                              // .find({price: {$gt: 10, $lt: 20}});     //Comparison operators 
                              // .find().or({author: 'Mosh'}, {author: 'Hamedani'});    //Logical operator
                              // .find({author: /.*Mosh.*/i});    //Regular expression syntax
                              // .count();
  console.log(courses);
}

// get_courses();

async function update_course(id){
  //Query first approach
  // const course = await Course.findById(id);
  // if (!course) return;

  // course.author = 'Another author';
  // const result = await course.save();
  // console.log(result);

  //Update first Approach
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason',
      is_published: false
    }
  }, {new: true});
  console.log(course);
}

// update_course('5facefbcad77993db4912bea');

async function delete_course(id){
  //First Approach
  // const course = await Course.findByIdAndDelete(id);
  
  //Second Approach
  const course = await Course.deleteOne({_id: id});
  console.log(course);
}

// delete_course('5facefbcad77993db4912bea');
