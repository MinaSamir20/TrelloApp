import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../Models/task';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];

  index!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  addTask() {
    this.tasks.push({
      Title: this.todoForm.value.item,
      IsDone: false,
    });
    this.todoForm.reset();
  }
  editTask() {
    this.tasks[this.index].Title = this.todoForm.value.item;
    this.tasks[this.index].IsDone = false;
    this.todoForm.reset();
    this.index = undefined;
    this.isEditEnabled = false;
  }
  deleteTodoTask(id: any) {
    this.tasks.splice(id, 1);
  }
  deleteDoneTask(id: any) {
    this.done.splice(id, 1);
  }
  deleteInProgressTask(id: any) {
    this.inprogress.splice(id, 1);
  }
  updateTask(task: Task, id: any) {
    this.todoForm.controls['item'].setValue(task.Title);
    this.index = id;
    this.isEditEnabled = false;
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
