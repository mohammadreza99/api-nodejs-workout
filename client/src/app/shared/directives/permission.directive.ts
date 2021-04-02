import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { RestaurantService } from '@core/http';

@Directive({
  selector: '[ngPermission]',
})
export class PermissionDirective implements OnInit {
  private currentUser;
  private permissions = [];
  private logicalOp = 'AND';
  private isHidden = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: RestaurantService
  ) {}

  ngOnInit() {
    // this.userService.currentUser.subscribe((user) => {
    //   this.currentUser = user;
    //   this.updateView();
    // });
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;

    if (this.currentUser && this.currentUser.permissions) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUser.permissions.find(
          (x) => x.toUpperCase() === checkPermission.toUpperCase()
        );

        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }

    return hasPermission;
  }
}

/*
Usage Sample :
  <strong>AND concatenation:</strong>
  <div *hasPermission="['can_write', 'can_read']">
    Only users with can_write AND can_read can see this.
  </div>

  <strong>OR concatenation:</strong>
  <div *hasPermission="['can_write', 'can_read']; op 'OR'">
    Only users with can_write OR can_read can see this.
  </div>
*/
