import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {Habit} from "../../shared/models";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {calcPosNegSumRelOccurrences} from "../../shared/utils";

@Component({
    selector: 'app-progress-renderer',
    standalone: true,
    template: `
        @if (negativeSumRelOccurrences < 0 || positiveSumRelOccurrences > 0) {
            <span style="font-weight: bold"
                  [ngStyle]="negativeSumRelOccurrences + positiveSumRelOccurrences < 0 ? {color: 'deeppink'} : {color: 'black'}">{{ negativeSumRelOccurrences + positiveSumRelOccurrences }}</span>
        } @else {
            <span style="color: grey; font-style: italic;">none</span>
        }
    `,
    imports: [
        MatIcon,
        MatButton,
        MatIconButton,
        NgIf,
        NgForOf,
        AsyncPipe,
        MatMiniFabButton,
        NgStyle,
        MatTooltip
    ],
})
export class ProgressRenderer implements ICellRendererAngularComp {
    habit: Habit | undefined = undefined;
    positiveSumRelOccurrences = 0;
    negativeSumRelOccurrences = 0;

    agInit(params: ICellRendererParams): void {
        if (params.data && params.data.occurrences && params.colDef && params.colDef.field) {
            const {
                negativeSumRelOccurrences,
                positiveSumRelOccurrences
            } = calcPosNegSumRelOccurrences(params.data.occurrences, params.colDef.field);
            this.negativeSumRelOccurrences = negativeSumRelOccurrences;
            this.positiveSumRelOccurrences = positiveSumRelOccurrences;
        }
    }

    refresh(): boolean {
        // TODO change to true, if refresh necessary
        return false;
    }
}
