const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  let assertName = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      })
  }

  // NOTE: Model instances tests.
  it('instance type using set & save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });
  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex'}), done);
  });

  // NOTE: Class tests.
  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });
  it('A model class can update a record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });
  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });
  // NOTE: xit will tell Mongoose not to look at the test.
  it('A user can have their likes incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
          assert(user.likes === 1);
          done();
        });
  });
});
