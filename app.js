import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import indexRouter from './routes/index.js';
import studentRouter from './routes/students.js';
import subjectRouter from './routes/subjects.js';
import professorRouter from './routes/professors.js';
import coursesRouter from './routes/courses.js';
import sectionRouter from './routes/sections.js';
import authRouter from './routes/auth.js';
import { isAuthenticated } from './functions/jwt.js';

// import from './routes/student'; './routes/index'; './routes/student';

var app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(isAuthenticated)
app.use('/students', studentRouter);
app.use('/subjects', subjectRouter);
app.use('/professors', professorRouter);
app.use('/courses', coursesRouter);
app.use('/sections', sectionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
