import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IGroup, Group } from '../group.model';
import { GroupService } from '../service/group.service';

@Component({
  selector: 'jhi-group-update',
  templateUrl: './group-update.component.html',
})
export class GroupUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [],
    topic: [],
    grade: [],
    year: [],
  });

  constructor(protected groupService: GroupService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ group }) => {
      this.updateForm(group);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const group = this.createFromForm();
    if (group.id !== undefined) {
      this.subscribeToSaveResponse(this.groupService.update(group));
    } else {
      this.subscribeToSaveResponse(this.groupService.create(group));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroup>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(group: IGroup): void {
    this.editForm.patchValue({
      id: group.id,
      description: group.description,
      topic: group.topic,
      grade: group.grade,
      year: group.year,
    });
  }

  protected createFromForm(): IGroup {
    return {
      ...new Group(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      topic: this.editForm.get(['topic'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      year: this.editForm.get(['year'])!.value,
    };
  }
}
